import ExamResult from "../models/ExamResult.js";
import User from "../models/User.js";
import csvParser from "csv-parser";
import fs from "fs";
import PDFDocument from "pdfkit";

// 🔹 Helper: Map grade → points
const getPointsFromGrade = (grade) => {
  switch (grade) {
    case "EE1": return 8;
    case "EE2": return 7;
    case "AE1": return 6;
    case "AE2": return 5;
    case "ME1": return 4;
    case "ME2": return 3;
    case "BE1": return 2;
    case "BE2": return 1;
    default: return 0;
  }
};

// 🔹 Helper: Compute grade from marks
const getCBEGrade = (marks) => {
  if (marks >= 90) return "EE1";
  if (marks >= 75) return "EE2";
  if (marks >= 58) return "ME1";
  if (marks >= 41) return "ME2";
  if (marks >= 31) return "AE1";
  if (marks >= 21) return "AE2";
  if (marks >= 11) return "BE1";
  return "BE2";
};

// 🔹 Helper: Compute overall grade from average marks
const computeOverallGrade = (subjectResults) => {
  if (!subjectResults || subjectResults.length === 0) return null;
  const totalMarks = subjectResults.reduce((sum, subj) => sum + subj.marks, 0);
  const avgMarks = totalMarks / subjectResults.length;
  return getCBEGrade(avgMarks);
};

// 🔹 Upload Exam Results
const uploadExamResults = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "CSV file is required" });
    }

    const students = [];

    await new Promise((resolve, reject) => {
      fs.createReadStream(req.file.path)
        .pipe(csvParser({ skipEmptyLines: true, mapHeaders: ({ header }) => header.trim() }))
        .on("data", (row) => {
          if (!row.admissionNumber || !row.examType) {
            console.warn("Skipping invalid row:", row);
            return;
          }

          const subjectResults = [];
          Object.keys(row).forEach((key) => {
            if (!["admissionNumber", "examType", "Comment", "term", "year"].includes(key)) {
              const marks = Number(row[key]);
              if (!isNaN(marks)) {
                const grade = getCBEGrade(marks);
                subjectResults.push({
                  subjectName: key.trim(),
                  marks,
                  grade,
                  points: getPointsFromGrade(grade),
                });
              }
            }
          });

          students.push({
            admissionNumber: row.admissionNumber.trim().toUpperCase().replace(/^ADM/, ""),
            examType: row.examType?.trim().toLowerCase(),
            subjectResults,
            overallComment: row.Comment?.trim() || "",
            term: row.term?.trim().toLowerCase() || "term 1",
            year: row.year ? Number(row.year) : new Date().getFullYear(),
            uploadedBy: req.user?._id,
            sourceFile: req.file.originalname,
          });
        })
        .on("end", resolve)
        .on("error", reject);
    });

    const toInsert = [];
    for (const s of students) {
      const student = await User.findOne({ admissionNumber: s.admissionNumber });
      if (!student) {
        console.warn(`No student found for admissionNumber ${s.admissionNumber}`);
        continue;
      }

      if (student.grade !== req.user.classTeacher) {
        console.warn(`Teacher not authorized to upload for ${student.grade}`);
        continue;
      }

      toInsert.push({
        ...s,
        studentId: student._id,
        overallGrade: computeOverallGrade(s.subjectResults),
        className: student.grade,
      });
    }

    if (toInsert.length === 0) {
      return res.status(400).json({ message: "No valid exam results to insert." });
    }

    await ExamResult.insertMany(toInsert);

    // After inserting, calculate positions
    const { examType, term, year } = toInsert[0];
    const className = toInsert[0].className;

    const classResults = await ExamResult.find({ examType, term, year, className });

    const ranked = classResults.map((r) => {
      const totalPoints = r.subjectResults.reduce((sum, subj) => sum + getPointsFromGrade(subj.grade), 0);
      return { id: r._id, admissionNumber: r.admissionNumber, totalPoints };
    });

    ranked.sort((a, b) => b.totalPoints - a.totalPoints);

    for (let i = 0; i < ranked.length; i++) {
      await ExamResult.findByIdAndUpdate(ranked[i].id, { position: i + 1 });
    }

    res.json({
      message: "Exam results uploaded successfully and positions calculated",
      count: toInsert.length,
    });
  } catch (err) {
    console.error("Error uploading exam results:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 Student Results
const getStudentResults = async (req, res) => {
  try {
    const admissionNumber = req.params.admissionNumber.trim().toUpperCase().replace(/^ADM/, "");

    const results = await ExamResult.find({
      $or: [
        { admissionNumber },
        { studentId: req.user._id }
      ]
    }).sort({ createdAt: -1 });

    if (!results || results.length === 0) {
      return res.json([]);
    }

    for (const exam of results) {
      const classResults = await ExamResult.find({
        examType: exam.examType,
        term: exam.term,
        year: exam.year,
        className: exam.className,
      });

      const ranked = classResults.map((r) => {
        const totalPoints = r.subjectResults.reduce((sum, subj) => sum + getPointsFromGrade(subj.grade), 0);
        return { admissionNumber: r.admissionNumber, totalPoints };
      });

      ranked.sort((a, b) => b.totalPoints - a.totalPoints);

      ranked.forEach((r, idx) => {
        if (r.admissionNumber === exam.admissionNumber) {
          exam.position = idx + 1;
        }
      });
    }

    res.json(results);
  } catch (err) {
    console.error("Error fetching student results:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 Teacher Class Performance
const getClassPerformance = async (req, res) => {
  try {
    const { examType, term, year } = req.query;
    const className = req.user.classTeacher;

    const results = await ExamResult.find({ examType, term, year, className });

    if (!results || results.length === 0) {
      return res.json({ performance: [], totalScore: 0, meanScore: 0 });
    }

    const primarySubjects = ["Math","English","Science","CRE","Social Studies","Kiswahili","Agriculture","Creative Art"];
    const juniorSubjects = ["Math","English","Science","CRE","Social Studies","Kiswahili","Agriculture","Creative Art","Pre-Tech"];

    const subjects = ["Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6"].includes(className)
      ? primarySubjects
      : juniorSubjects;

    const subjectTotals = {};
    const subjectCounts = {};
    let totalScore = 0;
    let totalMarksCount = 0;

    results.forEach((exam) => {
      exam.subjectResults.forEach((subj) => {
        if (subjects.includes(subj.subjectName)) {
          subjectTotals[subj.subjectName] = (subjectTotals[subj.subjectName] || 0) + subj.marks;
          subjectCounts[subj.subjectName] = (subjectCounts[subj.subjectName] || 0) + 1;
          totalScore += subj.marks;
          totalMarksCount++;
        }
      });
    });

    const performance = subjects.map((subject) => ({
      subject,
      average: subjectCounts[subject]
        ? Number((subjectTotals[subject] / subjectCounts[subject]).toFixed(2))
        : 0,
    }));

    const meanScore = totalMarksCount > 0 ? Number((totalScore / totalMarksCount).toFixed(2)) : 0;

    res.json({ performance, totalScore, meanScore });
  } catch (err) {
    console.error("Error computing class performance:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getSchoolPerformance = async (req, res) => {
  try {
    const { examType, term, year } = req.query;

    const primarySubjects = [
      "Math","English","Science","CRE",
      "Social Studies","Kiswahili","Agriculture","Creative Art"
    ];
    const juniorSubjects = [
      "Math","English","Science","CRE",
      "Social Studies","Kiswahili","Agriculture","Creative Art","Pre-Tech"
    ];

    // Fetch results
    const primaryResults = await ExamResult.find({
      examType, term, year,
      className: { $in: ["Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6"] }
    });

    const juniorResults = await ExamResult.find({
      examType, term, year,
      className: { $in: ["Grade 7","Grade 8","Grade 9"] }
    });

    // 🔹 Compute averages against fixed subject list
    const computePerformance = (results, subjects) => {
      if (!results || results.length === 0) {
        return { performance: subjects.map(s => ({ subject: s, average: 0 })), totalScore: 0, meanScore: 0 };
      }

      const subjectTotals = {};
      const subjectCounts = {};
      let totalScore = 0;
      let totalMarksCount = 0;

      results.forEach((exam) => {
        exam.subjectResults.forEach((subj) => {
          if (subjects.includes(subj.subjectName)) {
            subjectTotals[subj.subjectName] = (subjectTotals[subj.subjectName] || 0) + subj.marks;
            subjectCounts[subj.subjectName] = (subjectCounts[subj.subjectName] || 0) + 1;
            totalScore += subj.marks;
            totalMarksCount++;
          }
        });
      });

      const performance = subjects.map((subject) => ({
        subject,
        average: subjectCounts[subject]
          ? Number((subjectTotals[subject] / subjectCounts[subject]).toFixed(2))
          : 0,
      }));

      const meanScore = totalMarksCount > 0 ? Number((totalScore / totalMarksCount).toFixed(2)) : 0;

      return { performance, totalScore, meanScore };
    };

    res.json({
      primary: computePerformance(primaryResults, primarySubjects),
      juniorSecondary: computePerformance(juniorResults, juniorSubjects),
    });
  } catch (err) {
    console.error("Error computing school performance:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
export {
  uploadExamResults,
  getStudentResults,
  getExamResultPDF,
  getAllUploadedExams,
  getClassPerformance,
  getSchoolPerformance,
};
