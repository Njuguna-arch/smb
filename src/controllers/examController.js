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

// 🔹 Helpers to normalize values to schema enums
const normalizeExamType = (val) => {
  switch (val?.trim().toLowerCase()) {
    case "opener": return "Opener";
    case "mid-term": return "Mid-Term";
    case "end-term": return "End-Term";
    default: return val; // fallback
  }
};

const normalizeTerm = (val) => {
  switch (val?.trim().toLowerCase()) {
    case "term 1": return "Term 1";
    case "term 2": return "Term 2";
    case "term 3": return "Term 3";
    default: return val; // fallback
  }
};

const uploadExamResults = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const results = [];
    const stream = fs.createReadStream(req.file.path).pipe(csvParser());

    stream.on("data", (row) => {
      const admissionNumber = row.admissionNumber?.trim().toUpperCase().replace(/^ADM/, "");
      const examType = normalizeExamType(row.examType);
      const term = normalizeTerm(row.term);
      const year = row.year && !isNaN(row.year) ? Number(row.year) : new Date().getFullYear();

      const subjects = Object.keys(row).filter(
        (key) => !["admissionNumber", "examType", "term", "year", "Comment"].includes(key)
      );

      const subjectResults = subjects.map((subject) => ({
        subjectName: subject,
        marks: Number(row[subject]) || 0,
        grade: getGradeFromMarks(Number(row[subject]) || 0),
      }));

      results.push({
        admissionNumber,
        examType,
        term,
        year,
        subjectResults,
        overallComment: row.Comment || "",
        uploadedBy: req.user._id,
        className: req.user.classTeacher,
      });
    });

    stream.on("end", async () => {
      const toInsert = [];

      for (const exam of results) {
        const student = await User.findOne({ admissionNumber: exam.admissionNumber });
        if (!student) {
          console.warn(`No student found for admission ${exam.admissionNumber}`);
          continue;
        }
        if (student.grade !== req.user.classTeacher) {
          console.warn(`Teacher not authorized for ${student.grade}`);
          continue;
        }

        exam.studentId = student._id;
        toInsert.push(exam);
      }

      if (toInsert.length === 0) {
        return res.status(400).json({ message: "No valid exam results to insert" });
      }

      await ExamResult.insertMany(toInsert);
      res.json({ message: "Exam results uploaded successfully", count: toInsert.length });
    });
  } catch (err) {
    console.error("Error uploading exam results:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getStudentResults = async (req, res) => {
  try {
    const admissionNumber = req.params.admissionNumber
      ?.trim()
      .toUpperCase()
      .replace(/^ADM/, "");

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
      const examType = exam.examType?.trim().toLowerCase();
      const term = exam.term?.trim().toLowerCase();
      const year = Number(exam.year);

      const classResults = await ExamResult.find({
        examType,
        term,
        year,
        className: exam.className,
      });

      const ranked = classResults.map((r) => {
        const totalPoints = r.subjectResults.reduce(
          (sum, subj) => sum + getPointsFromGrade(subj.grade), 0
        );
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

// 🔹 Generate Exam Result PDF
const getExamResultPDF = async (req, res) => {
  const { admissionNumber, examType, term, year } = req.params;
  try {
    const exam = await ExamResult.findOne({ admissionNumber, examType, term, year })
      .populate("studentId");

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    // classmates for ranking
    const classResults = await ExamResult.find({ examType, term, year, className: exam.className });
    const ranked = classResults.map((r) => ({
      admissionNumber: r.admissionNumber,
      totalPoints: r.subjectResults.reduce((sum, subj) => sum + getPointsFromGrade(subj.grade), 0),
    }));
    ranked.sort((a, b) => b.totalPoints - a.totalPoints);

    let position = "N/A";
    ranked.forEach((r, idx) => {
      if (r.admissionNumber === exam.admissionNumber) position = idx + 1;
    });

    // PDF response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${examType}-${term}-${year}.pdf"`);

    const doc = new PDFDocument({ margin: 40 });
    doc.pipe(res);

    doc.fontSize(18).text(`Exam Results - ${examType} ${term} ${year}`, { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Student: ${exam.studentId?.name || "N/A"}`);
    doc.text(`Admission Number: ${exam.admissionNumber}`);
    doc.text(`Overall Grade: ${exam.overallGrade || "N/A"}`);
    doc.text(`Position: ${position}`);
    doc.moveDown();

    exam.subjectResults.forEach((subj) => {
      doc.text(`${subj.subjectName}: ${subj.marks} (${subj.grade})`);
    });

    doc.moveDown(2);
    doc.text(`Teacher's Comment: ${exam.overallComment || "N/A"}`, { align: "center" });
    doc.end();
  } catch (err) {
    console.error("Error generating PDF:", err);
    res.status(500).json({ message: "Failed to generate PDF" });
  }
};

// 🔹 Get All Uploaded Exams
const getAllUploadedExams = async (req, res) => {
  try {
    const exams = await ExamResult.find({ className: req.user.classTeacher })
      .sort({ createdAt: -1 })
      .populate("uploadedBy", "name")
      .populate("studentId", "name admissionNumber grade");

    if (!exams || exams.length === 0) {
      return res.json({ exams: [], message: "No exam results uploaded yet" });
    }

    res.json({ exams });
  } catch (err) {
    console.error("Error fetching uploaded exams:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};


const getClassPerformance = async (req, res) => {
  try {
    // Normalize query values
    const examType = req.query.examType?.trim().toLowerCase();
    const term = req.query.term?.trim().toLowerCase();
    const year = Number(req.query.year);
    const className = req.user.classTeacher;

    const results = await ExamResult.find({ examType, term, year, className });

    if (!results || results.length === 0) {
      return res.json({ performance: [], totalScore: 0, meanScore: 0 });
    }

    const primarySubjects = [
      "Math","English","Science","CRE",
      "Social Studies","Kiswahili","Agriculture","Creative Art"
    ];
    const juniorSubjects = [
      "Math","English","Science","CRE",
      "Social Studies","Kiswahili","Agriculture","Creative Art","Pre-Tech"
    ];

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

    const meanScore = totalMarksCount > 0
      ? Number((totalScore / totalMarksCount).toFixed(2))
      : 0;

    res.json({ performance, totalScore, meanScore });
  } catch (err) {
    console.error("Error computing class performance:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getSchoolPerformance = async (req, res) => {
  try {
    // Normalize query values
    const examType = req.query.examType?.trim().toLowerCase();
    const term = req.query.term?.trim().toLowerCase();
    const year = Number(req.query.year);

    const primarySubjects = [
      "Math","English","Science","CRE",
      "Social Studies","Kiswahili","Agriculture","Creative Art"
    ];
    const juniorSubjects = [
      "Math","English","Science","CRE",
      "Social Studies","Kiswahili","Agriculture","Creative Art","Pre-Tech"
    ];

    // Fetch results by grade groups
    const primaryResults = await ExamResult.find({
      examType, term, year,
      className: { $in: ["Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6"] }
    });

    const juniorResults = await ExamResult.find({
      examType, term, year,
      className: { $in: ["Grade 7","Grade 8","Grade 9"] }
    });

    // Compute averages against fixed subject list
    const computePerformance = (results, subjects) => {
      if (!results || results.length === 0) {
        return {
          performance: subjects.map(s => ({ subject: s, average: 0 })),
          totalScore: 0,
          meanScore: 0
        };
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

      const meanScore = totalMarksCount > 0
        ? Number((totalScore / totalMarksCount).toFixed(2))
        : 0;

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
