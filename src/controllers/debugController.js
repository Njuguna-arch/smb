import PDFDocument from "pdfkit";

export const generateStudentReport = (req, res) => {
  const {
    name = "Mary Wanja",
    admission = "ADM001",
    examType = "Mid-Term Term 1 2026",
    grade = "EE2",
    position = "2nd",
    subjects = [
      { name: "Math", marks: 60, grade: "ME1", points: 4 },
      { name: "English", marks: 88, grade: "EE2", points: 7 },
      { name: "Science", marks: 80, grade: "EE2", points: 7 },
      { name: "Pre-Tech", marks: 67, grade: "ME1", points: 4 },
      { name: "CRE", marks: 98, grade: "EE1", points: 8 },
      { name: "Social Studies", marks: 65, grade: "ME1", points: 4 },
      { name: "Kiswahili", marks: 90, grade: "EE1", points: 8 },
      { name: "Agriculture", marks: 74, grade: "ME1", points: 4 },
      { name: "Creative Arts", marks: 86, grade: "EE2", points: 7 },
    ],
    comment = "Good Work",
  } = req.body;

  const doc = new PDFDocument({ margin: 50 });
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "inline; filename=student-report.pdf");
  doc.pipe(res);

  // === Logo ===
  doc.image("uploads/logo.png", 50, 30, { width: 60 });

  // === School Name ===
  doc.fontSize(24).text("GRATHER ACADEMY AND JUNIOR SECONDARY", { align: "center" });
  doc.moveDown();

  // === Centered Exam Header ===
  doc.fontSize(18).text(`Exam Results - ${examType}`, { align: "center" });
  doc.moveDown();

  // === Student Info Section ===
  doc.fontSize(14).text(`Student: ${name}`);
  doc.text(`Admission Number: ${admission}`);
  doc.text(`Overall Grade: ${grade}`);
  doc.text(`Position: ${position}`);

  // === Separator Line ===
  doc.moveTo(50, doc.y + 10).lineTo(550, doc.y + 10).stroke();
  doc.moveDown();

  // === Table Header ===
  const tableTop = doc.y;
  const colX = { subject: 50, marks: 200, grade: 300, points: 400 };

  doc.fontSize(12).text("Subject", colX.subject, tableTop);
  doc.text("Marks", colX.marks, tableTop);
  doc.text("Grade", colX.grade, tableTop);
  doc.text("Points", colX.points, tableTop);

  // Header bottom line
  doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();

  // === Table Rows with Grid ===
  let y = tableTop + 30;
  subjects.forEach((s) => {
    doc.text(s.name, colX.subject + 5, y);
    doc.text(String(s.marks), colX.marks + 5, y);
    doc.text(s.grade, colX.grade + 5, y);
    doc.text(String(s.points), colX.points + 5, y);

    // Horizontal line under row
    doc.moveTo(50, y + 15).lineTo(550, y + 15).stroke();

    y += 25;
  });

  // === Vertical column lines ===
  const tableBottom = y;
  doc.moveTo(50, tableTop - 5).lineTo(50, tableBottom).stroke();   // Left border
  doc.moveTo(190, tableTop - 5).lineTo(190, tableBottom).stroke(); // Subject col
  doc.moveTo(290, tableTop - 5).lineTo(290, tableBottom).stroke(); // Marks col
  doc.moveTo(390, tableTop - 5).lineTo(390, tableBottom).stroke(); // Grade col
  doc.moveTo(550, tableTop - 5).lineTo(550, tableBottom).stroke(); // Right border

  // === Teacher Comment ===
  doc.moveDown();
  doc.fontSize(14).text(`Teacher's Comment: ${comment}`);

  doc.end();
};
