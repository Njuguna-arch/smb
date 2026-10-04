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
    doc.rect(40, 36, 515, 70).fill(primaryColor);
    doc.fillColor("#ffffff").font("Helvetica-Bold").fontSize(18);
    doc.text(schoolName.toUpperCase(), 40, 46, { width: 515, align: "center" });
    doc.fontSize(13);
    doc.text(`STUDENT: ${name.toUpperCase()}`, 40, 68, { width: 515, align: "center" });
    doc.fontSize(9.5).font("Helvetica");
    doc.text("OFFICIAL STUDENT EXAM REPORT CARD", 40, 88, { width: 515, align: "center" });

    // Student Info Card
    const infoY = 116;
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

    // Results Table with full borders
    const tableTop = 205;
    const colDiv1 = 240;
    const colDiv2 = 340;
    const colDiv3 = 440;
    const tableRight = 555;
    const rowHeight = 24;

    // Table Header in Green
    doc.rect(40, tableTop, 515, 26).fillAndStroke(primaryColor, primaryColor);
    doc.strokeColor("#ffffff").lineWidth(0.5);
    doc.moveTo(colDiv1, tableTop).lineTo(colDiv1, tableTop + 26).stroke();
    doc.moveTo(colDiv2, tableTop).lineTo(colDiv2, tableTop + 26).stroke();
    doc.moveTo(colDiv3, tableTop).lineTo(colDiv3, tableTop + 26).stroke();

    doc.fillColor("#ffffff").font("Helvetica-Bold").fontSize(10);
    doc.text("SUBJECT", 45, tableTop + 8, { width: 190, align: "center" });
    doc.text("MARKS (%)", colDiv1, tableTop + 8, { width: 100, align: "center" });
    doc.text("GRADE", colDiv2, tableTop + 8, { width: 100, align: "center" });
    doc.text("RUBRICS / POINTS", colDiv3, tableTop + 8, { width: 115, align: "center" });

    let currentY = tableTop + 26;
    let totalMarks = 0;
    let count = 0;

    subjects.forEach((subj, index) => {
      const rowBg = index % 2 === 0 ? "#ffffff" : lightGray;
      doc.rect(40, currentY, 515, rowHeight).fillAndStroke(rowBg, borderColor);

      // Vertical cell borders
      doc.strokeColor(borderColor).lineWidth(0.5);
      doc.moveTo(colDiv1, currentY).lineTo(colDiv1, currentY + rowHeight).stroke();
      doc.moveTo(colDiv2, currentY).lineTo(colDiv2, currentY + rowHeight).stroke();
      doc.moveTo(colDiv3, currentY).lineTo(colDiv3, currentY + rowHeight).stroke();

      doc.fillColor(darkGray).font("Helvetica").fontSize(10);
      doc.text(subj.name || "Subject", 50, currentY + 7);

      const m = Number(subj.marks);
      if (!isNaN(m)) {
        totalMarks += m;
        count++;
        doc.text(m.toString(), colDiv1, currentY + 7, { width: 100, align: "center" });
      } else {
        doc.text("-", colDiv1, currentY + 7, { width: 100, align: "center" });
      }

      doc.font("Helvetica-Bold").text(subj.grade || "-", colDiv2, currentY + 7, { width: 100, align: "center" });
      doc.font("Helvetica").text(String(subj.points ?? "-"), colDiv3, currentY + 7, { width: 115, align: "center" });

      currentY += rowHeight;
    });

    // Summary Row with borders
    const avgMarks = count > 0 ? (totalMarks / count).toFixed(1) : "N/A";
    doc.rect(40, currentY, 515, 26).fillAndStroke("#e8f5e9", borderColor);
    doc.strokeColor(borderColor).lineWidth(0.5);
    doc.moveTo(colDiv1, currentY).lineTo(colDiv1, currentY + 26).stroke();
    doc.moveTo(colDiv2, currentY).lineTo(colDiv2, currentY + 26).stroke();
    doc.moveTo(colDiv3, currentY).lineTo(colDiv3, currentY + 26).stroke();

    doc.fillColor(primaryColor).font("Helvetica-Bold").fontSize(10);
    doc.text("TOTAL / AVERAGE:", 45, currentY + 8, { width: 190, align: "center" });
    doc.text(`${totalMarks} (Avg: ${avgMarks}%)`, colDiv1, currentY + 8, { width: 100, align: "center" });
    doc.text(`Overall: ${grade}`, colDiv2, currentY + 8, { width: 100, align: "center" });
    doc.text("-", colDiv3, currentY + 8, { width: 115, align: "center" });

    // Outer table border
    doc.rect(40, tableTop, 515, currentY + 26 - tableTop).strokeColor(primaryColor).lineWidth(1).stroke();
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