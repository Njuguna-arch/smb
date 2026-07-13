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

const normalizeExamType = (val) => {
  switch (val?.trim().toLowerCase()) {
    case "opener": return "Opener";
    case "mid-term":
    case "midterm":
    case "mid term": return "Mid-Term";
    case "end-term":
    case "endterm":
    case "end term": return "End-Term";
    default: return val;
  }
};

const normalizeTerm = (val) => {
  switch (val?.trim().toLowerCase()) {
    case "term 1":
    case "1st term":
    case "term1": return "Term 1";
    case "term 2":
    case "2nd term":
    case "term2": return "Term 2";
    case "term 3":
    case "3rd term":
    case "term3": return "Term 3";
    default: return val;
  }
};

// 🔹 Upload Exam Results
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
        grade: getCBEGrade(Number(row[subject]) || 0),
      }));

      results.push({
        admissionNumber,
        examType,
        term,
        year,
        subjectResults,
        overallGrade: computeOverallGrade(subjectResults),
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
    const admissionNumber = req.params.admissionNumber?.trim().toUpperCase().replace(/^ADM/, "");

    const results = await ExamResult.find({
      $or: [{ admissionNumber }, { studentId: req.user._id }]
    }).sort({ createdAt: -1 });

    if (!results || results.length === 0) {
      return res.json([]);
    }

    for (const exam of results) {
      const examType = normalizeExamType(exam.examType);
      const term = normalizeTerm(exam.term);
      const year = Number(exam.year);

      const classResults = await ExamResult.find({ examType, term, year, className: exam.className });

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

const getExamResultPDF = async (req, res) => {
  const { admissionNumber, examType, term, year } = req.params;
  try {
    const examTypeNorm = normalizeExamType(examType);
    const termNorm = normalizeTerm(term);

    const exam = await ExamResult.findOne({
      admissionNumber,
      examType: examTypeNorm,
      term: termNorm,
      year
    }).populate("studentId");

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    // classmates for ranking
    const classResults = await ExamResult.find({
      examType: examTypeNorm,
      term: termNorm,
      year,
      className: exam.className
    });

    const ranked = classResults.map((r) => ({
      admissionNumber: r.admissionNumber,
      totalPoints: r.subjectResults.reduce(
        (sum, subj) => sum + getPointsFromGrade(subj.grade), 0
      ),
    }));
    ranked.sort((a, b) => b.totalPoints - a.totalPoints);

    let position = "N/A";
    ranked.forEach((r, idx) => {
      if (r.admissionNumber === exam.admissionNumber) position = idx + 1;
    });

    // PDF response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${examTypeNorm}-${termNorm}-${year}.pdf"`);

    const doc = new PDFDocument({ margin: 40 });
    doc.pipe(res);

    doc.fontSize(18).text(`Exam Results - ${examTypeNorm} ${termNorm} ${year}`, { align: "center" });
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
    const examType = normalizeExamType(req.query.examType);
    const term = normalizeTerm(req.query.term);
    const year = Number(req.query.year);
    const className = req.user.classTeacher;

    console.log("DEBUG: Query Params →", { examType, term, year, className });

    const results = await ExamResult.find({ examType, term, year, className });
    console.log("DEBUG: Results Count →", results.length);

    if (!results || results.length === 0) {
      console.log("DEBUG: No results found");
      return res.json({ performance: [], totalScore: 0, meanScore: 0 });
    }

    // Build subject list dynamically
    const subjects = [...new Set(
      results.flatMap(r => r.subjectResults.map(s => s.subjectName.trim()))
    )];
    console.log("DEBUG: Subjects Found →", subjects);

    const subjectTotals = {};
    const subjectCounts = {};
    let totalScore = 0;
    let totalMarksCount = 0;

    results.forEach((exam, examIndex) => {
      console.log(`DEBUG: Exam #${examIndex} admissionNumber=${exam.admissionNumber}`);
      exam.subjectResults.forEach((subj, subjIndex) => {
        console.log(`   Subject #${subjIndex} →`, subj.subjectName, "Marks:", subj.marks, "Type:", typeof subj.marks);
        const subject = subj.subjectName.trim();
        subjectTotals[subject] = (subjectTotals[subject] || 0) + Number(subj.marks);
        subjectCounts[subject] = (subjectCounts[subject] || 0) + 1;
        totalScore += Number(subj.marks);
        totalMarksCount++;
      });
    });

    console.log("DEBUG: Subject Totals →", subjectTotals);
    console.log("DEBUG: Subject Counts →", subjectCounts);
    console.log("DEBUG: Total Score →", totalScore, "Total Marks Count →", totalMarksCount);

    const performance = subjects.map((subject) => ({
      subject,
      average: subjectCounts[subject]
        ? Number((subjectTotals[subject] / subjectCounts[subject]).toFixed(2))
        : 0,
    }));

    console.log("DEBUG: Performance →", performance);

    const meanScore = totalMarksCount > 0
      ? Number((totalScore / totalMarksCount).toFixed(2))
      : 0;

    console.log("DEBUG: Mean Score →", meanScore);

    res.json({ performance, totalScore, meanScore });
  } catch (err) {
    console.error("Error computing class performance:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};


const getSchoolPerformance = async (req, res) => {
  try {
    const examType = normalizeExamType(req.query.examType);
    const term = normalizeTerm(req.query.term);
    const year = Number(req.query.year);

    console.log("DEBUG: School Performance Query →", { examType, term, year });

    const primaryResults = await ExamResult.find({
      examType, term, year,
      className: { $in: ["Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6"] }
    });
    console.log("DEBUG: Primary Results Count →", primaryResults.length);

    const juniorResults = await ExamResult.find({
      examType, term, year,
      className: { $in: ["Grade 7","Grade 8","Grade 9"] }
    });
    console.log("DEBUG: Junior Results Count →", juniorResults.length);

    const computePerformance = (results, label) => {
      if (!results || results.length === 0) {
        console.log(`DEBUG: No ${label} results found`);
        return { performance: [], totalScore: 0, meanScore: 0 };
      }

      const subjects = [...new Set(
        results.flatMap(r => r.subjectResults.map(s => s.subjectName.trim()))
      )];
      console.log(`DEBUG: ${label} Subjects Found →`, subjects);

      const subjectTotals = {};
      const subjectCounts = {};
      let totalScore = 0;
      let totalMarksCount = 0;

      results.forEach((exam, examIndex) => {
        console.log(`DEBUG: ${label} Exam #${examIndex} admissionNumber=${exam.admissionNumber}`);
        exam.subjectResults.forEach((subj, subjIndex) => {
          console.log(`   Subject #${subjIndex} →`, subj.subjectName, "Marks:", subj.marks, "Type:", typeof subj.marks);
          const subject = subj.subjectName.trim();
          subjectTotals[subject] = (subjectTotals[subject] || 0) + Number(subj.marks);
          subjectCounts[subject] = (subjectCounts[subject] || 0) + 1;
          totalScore += Number(subj.marks);
          totalMarksCount++;
        });
      });

      console.log(`DEBUG: ${label} Subject Totals →`, subjectTotals);
      console.log(`DEBUG: ${label} Subject Counts →`, subjectCounts);
      console.log(`DEBUG: ${label} Total Score →`, totalScore, "Total Marks Count →", totalMarksCount);

      const performance = subjects.map((subject) => ({
        subject,
        average: subjectCounts[subject]
          ? Number((subjectTotals[subject] / subjectCounts[subject]).toFixed(2))
          : 0,
      }));

      console.log(`DEBUG: ${label} Performance →`, performance);

      const meanScore = totalMarksCount > 0
        ? Number((totalScore / totalMarksCount).toFixed(2))
        : 0;

      console.log(`DEBUG: ${label} Mean Score →`, meanScore);

      return { performance, totalScore, meanScore };
    };

    res.json({
      primary: computePerformance(primaryResults, "Primary"),
      juniorSecondary: computePerformance(juniorResults, "Junior"),
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
