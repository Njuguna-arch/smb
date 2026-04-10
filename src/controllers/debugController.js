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

  // === Centered Headers ===
  doc.fontSize(22).text("Grather Academy", { align: "center" });
  doc.moveDown();
  doc.fontSize(18).text(`Exam Results - ${examType}`, { align: "center" });
  doc.moveDown();

  // === Student Info Section ===
  doc.fontSize(14).text(`Student: ${name}`);
  doc.text(`Admission Number: ${admission}`);
  doc.text(`Overall Grade: ${grade}`);
  doc.text(`Position: ${position}`); // 👈 Position now directly under grade

  // === Separator Line ===
  doc.moveTo(50, doc.y + 10).lineTo(550, doc.y + 10).stroke();
  doc.moveDown();

  // === Table Header ===
  const tableTop = doc.y;
  doc.fontSize(12).text("Subject", 50, tableTop);
  doc.text("Marks", 200, tableTop);
  doc.text("Grade", 300, tableTop);
  doc.text("Points", 400, tableTop);

  doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();

  // === Table Rows ===
  let y = tableTop + 30;
  subjects.forEach((s) => {
    doc.text(s.name, 50, y);
    doc.text(String(s.marks), 200, y);
    doc.text(s.grade, 300, y);
    doc.text(String(s.points), 400, y);

    // Row separator
    doc.moveTo(50, y + 15).lineTo(550, y + 15).stroke();

    y += 25;
  });

  // === Teacher Comment ===
  doc.moveDown();
  doc.fontSize(14).text(`Teacher's Comment: ${comment}`);

  doc.end();
};
