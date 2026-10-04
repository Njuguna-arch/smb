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

// 🔹 Upload exam results from CSV
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
                  subjectName: key,
                  marks,
                  grade,
                  points: getPointsFromGrade(grade),   // 🔹 compute points from grade
                });
              }
            }
          });

          students.push({
            admissionNumber: row.admissionNumber.trim(),
            examType: row.examType.trim(),
            subjectResults,
            overallComment: row.Comment?.trim() || "",
            term: row.term?.trim() || "Term 1",
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

    res.json({
      message: "Exam results uploaded successfully",
      count: toInsert.length,
    });
  } catch (err) {
    console.error("Error uploading exam results:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 Fetch student results
const getStudentResults = async (req, res) => {
  try {
    const admissionNumber = req.params.admissionNumber;
    const results = await ExamResult.find({ admissionNumber }).sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    console.error("Error fetching student results:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getExamResultPDF = async (req, res) => {
  const { admissionNumber, examType, term, year } = req.params;

  try {
    const cleanAdm = admissionNumber ? admissionNumber.trim() : "";
    const admRegex = cleanAdm.startsWith("LA")
      ? new RegExp(`^(${cleanAdm}|${cleanAdm.replace(/^LA/i, "")})$`, "i")
      : new RegExp(`^(LA)?${cleanAdm}$`, "i");

    const query = {
      admissionNumber: admRegex,
      examType: new RegExp(`^${examType?.trim()}$`, "i"),
      term: new RegExp(`^${term?.trim()}$`, "i"),
      year: Number(year),
    };

    const exam = await ExamResult.findOne(query).populate("studentId");

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${examType}-${term}-${year}.pdf"`
    );

    const doc = new PDFDocument({ margin: 40 });
    doc.pipe(res);

    const primaryColor = "#2e7d32";
    const darkColor = "#263238";
    const borderColor = "#cfd8dc";

    // Top Header Banner in Green
    doc.rect(40, 36, 515, 68).fill(primaryColor);
    doc.fillColor("#ffffff").font("Helvetica-Bold").fontSize(18);
    doc.text("EDUSPHERE ACADEMY", 40, 46, { width: 515, align: "center" });

    // Student Name in the middle of the header
    const studentName = exam.studentId?.name || "Student";
    doc.fontSize(13);
    doc.text(`STUDENT: ${studentName.toUpperCase()}`, 40, 68, { width: 515, align: "center" });
    doc.fontSize(9.5).font("Helvetica");
    doc.text(`EXAM REPORT CARD — ${examType.toUpperCase()} ${term.toUpperCase()} ${year}`, 40, 87, { width: 515, align: "center" });

    // Student Info Card
    const infoY = 114;
    doc.rect(40, infoY, 515, 65).fillAndStroke("#ffffff", borderColor);
    doc.fillColor(darkColor).fontSize(10);
    doc.font("Helvetica-Bold").text("Admission No:", 55, infoY + 12);
    doc.font("Helvetica").text(exam.admissionNumber, 155, infoY + 12);

    doc.font("Helvetica-Bold").text("Class / Grade:", 55, infoY + 34);
    doc.font("Helvetica").text(exam.className || "N/A", 155, infoY + 34);

    doc.font("Helvetica-Bold").text("Overall Grade:", 330, infoY + 12);
    doc.font("Helvetica-Bold").fillColor(primaryColor).text(exam.overallGrade || "N/A", 430, infoY + 12);

    doc.fillColor(darkColor).font("Helvetica-Bold").text("Date Issued:", 330, infoY + 34);
    doc.font("Helvetica").text(new Date().toLocaleDateString("en-GB"), 430, infoY + 34);

    // Table with complete cell borders
    const tableTop = 190;
    const colDiv1 = 240;
    const colDiv2 = 340;
    const colDiv3 = 440;
    const rowH = 22;

    // Table Header in Green
    doc.rect(40, tableTop, 515, 24).fillAndStroke(primaryColor, primaryColor);
    doc.strokeColor("#ffffff").lineWidth(0.5);
    doc.moveTo(colDiv1, tableTop).lineTo(colDiv1, tableTop + 24).stroke();
    doc.moveTo(colDiv2, tableTop).lineTo(colDiv2, tableTop + 24).stroke();
    doc.moveTo(colDiv3, tableTop).lineTo(colDiv3, tableTop + 24).stroke();

    doc.fillColor("#ffffff").font("Helvetica-Bold").fontSize(10);
    doc.text("SUBJECT", 45, tableTop + 7, { width: 190, align: "center" });
    doc.text("MARKS (%)", colDiv1, tableTop + 7, { width: 100, align: "center" });
    doc.text("GRADE", colDiv2, tableTop + 7, { width: 100, align: "center" });
    doc.text("RUBRICS / POINTS", colDiv3, tableTop + 7, { width: 115, align: "center" });

    let rowY = tableTop + 24;
    let totalMarks = 0;
    let count = 0;

    exam.subjectResults.forEach((subj, idx) => {
      const rowBg = idx % 2 === 0 ? "#ffffff" : "#f8fbf8";
      doc.rect(40, rowY, 515, rowH).fillAndStroke(rowBg, borderColor);

      // Vertical column dividers
      doc.strokeColor(borderColor).lineWidth(0.5);
      doc.moveTo(colDiv1, rowY).lineTo(colDiv1, rowY + rowH).stroke();
      doc.moveTo(colDiv2, rowY).lineTo(colDiv2, rowY + rowH).stroke();
      doc.moveTo(colDiv3, rowY).lineTo(colDiv3, rowY + rowH).stroke();

      const points = getPointsFromGrade(subj.grade);
      const m = Number(subj.marks);
      if (!isNaN(m)) {
        totalMarks += m;
        count++;
      }

      doc.fillColor(darkColor).font("Helvetica").fontSize(10);
      doc.text(subj.subjectName, 50, rowY + 6);
      doc.text(subj.marks.toString(), colDiv1, rowY + 6, { width: 100, align: "center" });
      doc.font("Helvetica-Bold").text(subj.grade, colDiv2, rowY + 6, { width: 100, align: "center" });
      doc.font("Helvetica").text(points.toString(), colDiv3, rowY + 6, { width: 115, align: "center" });

      rowY += rowH;
    });

    // Summary Row with borders
    const avgMarks = count > 0 ? (totalMarks / count).toFixed(1) : "N/A";
    doc.rect(40, rowY, 515, 24).fillAndStroke("#e8f5e9", borderColor);
    doc.strokeColor(borderColor).lineWidth(0.5);
    doc.moveTo(colDiv1, rowY).lineTo(colDiv1, rowY + 24).stroke();
    doc.moveTo(colDiv2, rowY).lineTo(colDiv2, rowY + 24).stroke();
    doc.moveTo(colDiv3, rowY).lineTo(colDiv3, rowY + 24).stroke();

    doc.fillColor(primaryColor).font("Helvetica-Bold").fontSize(10);
    doc.text("TOTAL / AVERAGE:", 45, rowY + 7, { width: 190, align: "center" });
    doc.text(`${totalMarks} (Avg: ${avgMarks}%)`, colDiv1, rowY + 7, { width: 100, align: "center" });
    doc.text(`Overall: ${exam.overallGrade || "N/A"}`, colDiv2, rowY + 7, { width: 100, align: "center" });
    doc.text("-", colDiv3, rowY + 7, { width: 115, align: "center" });

    // Outer table border
    doc.rect(40, tableTop, 515, rowY + 24 - tableTop).strokeColor(primaryColor).lineWidth(1).stroke();
    rowY += 34;

    // Comment Box
    doc.rect(40, rowY, 515, 40).fillAndStroke("#f1f8e9", "#c8e6c9");
    doc.fillColor(primaryColor).font("Helvetica-Bold").fontSize(10);
    doc.text("Teacher's Remark:", 50, rowY + 8);
    doc.fillColor(darkColor).font("Helvetica-Oblique").fontSize(9.5);
    doc.text(`"${exam.overallComment || "Good progress. Keep working hard."}"`, 50, rowY + 22);

    doc.end();

  } catch (err) {
    console.error("Error generating PDF:", err);
    res.status(500).json({ message: "Failed to generate PDF" });
  }
};


const getAllUploadedExams = async (req, res) => {
  try {
    console.log("Teacher:", req.user.name, "ClassTeacher:", req.user.classTeacher);

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
    const { examType, term, year } = req.query;
    const results = await ExamResult.find({
      examType,
      term,
      year,
      className: req.user.classTeacher,
    });

    if (!results || results.length === 0) {
      return res.json({ performance: [], totalScore: 0, meanScore: 0 });
    }

    const subjectTotals = {};
    const subjectCounts = {};
    let totalScore = 0;
    let totalMarksCount = 0;

    results.forEach((exam) => {
      exam.subjectResults.forEach((subj) => {
        subjectTotals[subj.subjectName] =
          (subjectTotals[subj.subjectName] || 0) + subj.marks;
        subjectCounts[subj.subjectName] =
          (subjectCounts[subj.subjectName] || 0) + 1;

        totalScore += subj.marks;
        totalMarksCount++;
      });
    });

    const performance = Object.keys(subjectTotals).map((subject) => ({
      subject,
      average: (subjectTotals[subject] / subjectCounts[subject]).toFixed(2),
    }));

    const meanScore = (totalScore / totalMarksCount).toFixed(2);

    res.json({ performance, totalScore, meanScore });
  } catch (err) {
    console.error("Error computing class performance:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
const getSchoolPerformance = async (req, res) => {
  try {
    const { examType, term, year } = req.query;
    const results = await ExamResult.find({ examType, term, year });

    if (!results || results.length === 0) {
      return res.json({ performance: [], totalScore: 0, meanScore: 0 });
    }

    const subjectTotals = {};
    const subjectCounts = {};
    let totalScore = 0;
    let totalMarksCount = 0;

    results.forEach((exam) => {
      exam.subjectResults.forEach((subj) => {
        subjectTotals[subj.subjectName] =
          (subjectTotals[subj.subjectName] || 0) + subj.marks;
        subjectCounts[subj.subjectName] =
          (subjectCounts[subj.subjectName] || 0) + 1;

        totalScore += subj.marks;
        totalMarksCount++;
      });
    });

    const performance = Object.keys(subjectTotals).map((subject) => ({
      subject,
      average: Number(
        (subjectTotals[subject] / subjectCounts[subject]).toFixed(2)
      ),
    }));

    const meanScore = Number((totalScore / totalMarksCount).toFixed(2));

    res.json({ performance, totalScore, meanScore });
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