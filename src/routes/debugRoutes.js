// routes/debugRoutes.js
import express from "express";
import {
  testPDF,
  testPDFStudentInfo,
  testPDFTableHeader,
  testPDFOneRow,
} from "../controllers/debugController.js";

const router = express.Router();

// Debug routes (no auth middleware so you can test quickly)
router.get("/test-pdf", testPDF);
router.get("/test-student", testPDFStudentInfo);
router.get("/test-table", testPDFTableHeader);
router.get("/test-row", testPDFOneRow);

export default router;