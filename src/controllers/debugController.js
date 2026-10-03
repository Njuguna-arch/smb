import PDFDocument from "pdfkit";

export const testPDF = (req, res) => {
  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "inline; filename=test.pdf");
  doc.pipe(res);
  doc.fontSize(25).text("Hello World PDF", 100, 100);
  doc.end();
};

export const testPDFStudentInfo = (req, res) => {
  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "inline; filename=test-student.pdf");
  doc.pipe(res);

  doc.fontSize(22).text("Grather Academy", { align: "center" });
  doc.moveDown();
  doc.fontSize(18).text("Exam Results", { align: "center" });
  doc.moveDown();

  doc.fontSize(14).text("Student Name: John Doe");
  doc.text("Admission Number: 12345");
  doc.text("Exam Type: Mid-Term");
  doc.text("Grade: Grade 6");

  doc.end();
};

export const testPDFTableHeader = (req, res) => {
  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "inline; filename=test-table.pdf");
  doc.pipe(res);

  doc.fontSize(14).text("Subject Performance", { underline: true });
  doc.moveDown();

  const tableTop = doc.y;
  doc.fontSize(12).text("Subject", 50, tableTop);
  doc.text("Marks", 250, tableTop);
  doc.text("Grade", 350, tableTop);

  doc.end();
};

export const testPDFOneRow = (req, res) => {
  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "inline; filename=test-row.pdf");
  doc.pipe(res);

  const tableTop = doc.y;
  const y = tableTop + 25;

  doc.text("Math", 50, y);
  doc.text("85", 250, y);
  doc.text("EE2", 350, y);

  doc.end();
};

export const generateStudentReportPDF = async (req, res) => {
  try {
    const {
      name = "Student",
      admission = "N/A",
      examType = "Exam Results",
      grade = "N/A",
      position = "N/A",
      subjects = [],
      comment = "Good progress",
      schoolName = "EDUSPHERE ACADEMY",
    } = req.body;

    const doc = new PDFDocument({
      size: "A4",
      margin: 40,
      info: {
        Title: `${name} - Exam Results`,
        Author: "EduSphere",
      },
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${name.replace(/[^a-zA-Z0-9]/g, "_")}_Results.pdf"`
    );

    doc.pipe(res);

    const primaryColor = "#2e7d32";
    const darkGray = "#263238";
    const lightGray = "#f4f6f8";
    const borderColor = "#cfd8dc";

    // Top Header Banner
    doc.rect(40, 40, 515, 60).fill(primaryColor);
    doc.fillColor("#ffffff").font("Helvetica-Bold").fontSize(20);
    doc.text(schoolName.toUpperCase(), 40, 52, { width: 515, align: "center" });
    doc.fontSize(11).font("Helvetica");
    doc.text("OFFICIAL STUDENT EXAM REPORT CARD", 40, 77, { width: 515, align: "center" });

    // Student Info Card
    const infoY = 115;
    doc.rect(40, infoY, 515, 75).fillAndStroke("#ffffff", borderColor);

    doc.fillColor(darkGray).fontSize(10);
    
    // Left column
    doc.font("Helvetica-Bold").text("Student Name:", 55, infoY + 12);
    doc.font("Helvetica").text(name, 155, infoY + 12);

    doc.font("Helvetica-Bold").text("Admission No:", 55, infoY + 32);
    doc.font("Helvetica").text(admission, 155, infoY + 32);

    doc.font("Helvetica-Bold").text("Exam / Period:", 55, infoY + 52);
    doc.font("Helvetica").text(examType, 155, infoY + 52);

    // Right column
    doc.font("Helvetica-Bold").text("Overall Grade:", 330, infoY + 12);
    doc.font("Helvetica-Bold").fillColor(primaryColor).text(grade, 430, infoY + 12);

    doc.fillColor(darkGray).font("Helvetica-Bold").text("Position / Rank:", 330, infoY + 32);
    doc.font("Helvetica").text(position || "N/A", 430, infoY + 32);

    doc.font("Helvetica-Bold").text("Date Issued:", 330, infoY + 52);
    doc.font("Helvetica").text(new Date().toLocaleDateString("en-GB"), 430, infoY + 52);

    // Results Table
    const tableTop = 205;
    const colX = {
      subject: 55,
      marks: 270,
      grade: 360,
      points: 450,
    };

    // Table Header
    doc.rect(40, tableTop, 515, 26).fill(primaryColor);
    doc.fillColor("#ffffff").font("Helvetica-Bold").fontSize(10);
    doc.text("SUBJECT", colX.subject, tableTop + 8);
    doc.text("MARKS (%)", colX.marks, tableTop + 8, { width: 70, align: "center" });
    doc.text("GRADE", colX.grade, tableTop + 8, { width: 70, align: "center" });
    doc.text("LUBRICS / PTS", colX.points, tableTop + 8, { width: 85, align: "center" });

    let currentY = tableTop + 26;
    let totalMarks = 0;
    let count = 0;

    subjects.forEach((subj, index) => {
      const rowBg = index % 2 === 0 ? "#ffffff" : lightGray;
      doc.rect(40, currentY, 515, 24).fill(rowBg);

      doc.fillColor(darkGray).font("Helvetica").fontSize(10);
      doc.text(subj.name || "Subject", colX.subject, currentY + 7);

      const m = Number(subj.marks);
      if (!isNaN(m)) {
        totalMarks += m;
        count++;
        doc.text(m.toString(), colX.marks, currentY + 7, { width: 70, align: "center" });
      } else {
        doc.text("-", colX.marks, currentY + 7, { width: 70, align: "center" });
      }

      doc.font("Helvetica-Bold").text(subj.grade || "-", colX.grade, currentY + 7, { width: 70, align: "center" });
      doc.font("Helvetica").text(String(subj.points ?? "-"), colX.points, currentY + 7, { width: 85, align: "center" });

      // Row bottom border
      doc.moveTo(40, currentY + 24).lineTo(555, currentY + 24).strokeColor(borderColor).stroke();
      currentY += 24;
    });

    // Summary Row
    const avgMarks = count > 0 ? (totalMarks / count).toFixed(1) : "N/A";
    doc.rect(40, currentY, 515, 26).fill("#e8f5e9");
    doc.fillColor(primaryColor).font("Helvetica-Bold").fontSize(10);
    doc.text("TOTAL / AVERAGE:", colX.subject, currentY + 8);
    doc.text(`${totalMarks} (Avg: ${avgMarks}%)`, colX.marks, currentY + 8, { width: 140, align: "left" });
    doc.text(`Overall: ${grade}`, colX.points, currentY + 8, { width: 85, align: "center" });
    currentY += 36;

    // Teacher's Comment Box
    doc.rect(40, currentY, 515, 48).fillAndStroke("#f1f8e9", "#c8e6c9");
    doc.fillColor(primaryColor).font("Helvetica-Bold").fontSize(10);
    doc.text("Class Teacher's Remark:", 55, currentY + 10);
    doc.fillColor(darkGray).font("Helvetica-Oblique").fontSize(10);
    doc.text(`"${comment || "Good progress. Keep working hard."}"`, 55, currentY + 26);

    currentY += 65;

    // Signatures & Official Stamp
    const sigY = Math.max(currentY, 680);
    doc.strokeColor(borderColor);

    doc.moveTo(55, sigY + 30).lineTo(220, sigY + 30).stroke();
    doc.fillColor(darkGray).font("Helvetica").fontSize(9);
    doc.text("Class Teacher's Signature", 55, sigY + 35);

    doc.moveTo(375, sigY + 30).lineTo(540, sigY + 30).stroke();
    doc.text("Headteacher / Principal", 375, sigY + 35);

    // Footer note
    doc.fontSize(8).fillColor("#9e9e9e").text(
      "This is an official document generated by the EduSphere School Management System.",
      40,
      765,
      { width: 515, align: "center" }
    );

    doc.end();
  } catch (err) {
    console.error("Error generating student report PDF:", err);
    if (!res.headersSent) {
      res.status(500).json({ message: "Failed to generate report PDF", error: err.message });
    }
  }
};