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