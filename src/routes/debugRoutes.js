// routes/debugRoutes.js
import express from "express";
import {
  testPDF,
  testPDFStudentInfo,
  testPDFTableHeader,
  testPDFOneRow,
  generateStudentReportPDF,
} from "../controllers/debugController.js";

const router = express.Router();

// Debug & direct PDF generation routes
router.get("/test-pdf", testPDF);
router.get("/test-student", testPDFStudentInfo);
router.get("/test-table", testPDFTableHeader);
router.get("/test-row", testPDFOneRow);
router.post("/student-report", generateStudentReportPDF);

export default router;