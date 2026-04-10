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
  const doc = new PDFDocument({ margin: 50 });
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "inline; filename=test-student.pdf");
  doc.pipe(res);

  // === Logo ===
  doc.image("uploads/logo.png", 50, 30, { width: 60 });

  // === Centered Headers ===
  doc.fontSize(22).text("Grather Academy", { align: "center" });
  doc.moveDown();
  doc.fontSize(18).text("Exam Results Report", { align: "center" });
  doc.moveDown();

  // === Student Position in Header ===
  const position = req.query.position || "3rd";
  doc.fontSize(14).text(`Position: ${position}`, { align: "center" });
  doc.moveDown();

  // === Student Info Section ===
  const { name = "John Doe", admission = "12345", examType = "Mid-Term", grade = "Grade 6" } = req.query;
  doc.fontSize(14).text(`Student Name: ${name}`);
  doc.text(`Admission Number: ${admission}`);
  doc.text(`Exam Type: ${examType}`);
  doc.text(`Grade: ${grade}`);

  // === Draw Line for Separation ===
  doc.moveTo(50, doc.y + 10).lineTo(550, doc.y + 10).stroke();
  doc.moveDown();

  doc.end();
};

export const testPDFTableHeader = (req, res) => {
  const doc = new PDFDocument({ margin: 50 });
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "inline; filename=test-table.pdf");
  doc.pipe(res);

  doc.fontSize(14).text("Subject Performance", { align: "center", underline: true });
  doc.moveDown();

  const tableTop = doc.y;

  // Table headers
  doc.fontSize(12).text("Subject", 50, tableTop);
  doc.text("Marks", 250, tableTop);
  doc.text("Grade", 350, tableTop);

  // === Draw header line ===
  doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();

  doc.end();
};

export const testPDFOneRow = (req, res) => {
  const doc = new PDFDocument({ margin: 50 });
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "inline; filename=test-row.pdf");
  doc.pipe(res);

  const tableTop = doc.y;
  const y = tableTop + 25;

  // Row data
  doc.text("Math", 50, y);
  doc.text("85", 250, y);
  doc.text("A", 350, y);

  // === Draw row separator line ===
  doc.moveTo(50, y + 15).lineTo(550, y + 15).stroke();

  doc.end();
};

export const testPDFFullTable = (req, res) => {
  const doc = new PDFDocument({ margin: 50 });
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "inline; filename=test-full-table.pdf");
  doc.pipe(res);

  // === Header ===
  doc.fontSize(18).text("Subject Performance", { align: "center", underline: true });
  doc.moveDown();

  const tableTop = doc.y;

  // Table headers
  doc.fontSize(12).text("Subject", 50, tableTop);
  doc.text("Marks", 250, tableTop);
  doc.text("Grade", 350, tableTop);

  doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();

  // === Subjects from query or default ===
  const subjects = req.body.subjects || [
    { name: "Math", marks: 5, grade: "BE1" },
    { name: "English", marks: 8, grade: "BE1" },
    { name: "Science", marks: 2, grade: "BE1" },
    { name: "Kiswahili", marks: 2, grade: "BE1" },
  ];

  let y = tableTop + 30;
  subjects.forEach((s) => {
    doc.text(s.name, 50, y);
    doc.text(String(s.marks), 250, y);
    doc.text(s.grade, 350, y);

    // Row separator
    doc.moveTo(50, y + 15).lineTo(550, y + 15).stroke();

    y += 25;
  });

  doc.end();
};
