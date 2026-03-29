import express from "express";
import multer from "multer";
import { authenticateToken } from "../middleware/authMiddleware.js";
import {
  uploadExamResults,
  getStudentResults,
  getExamResultPDF,
  getAllUploadedExams,
} from "../controllers/examController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Upload exam results (CSV/Excel/PDF)
router.post("/upload", authenticateToken, upload.single("file"), uploadExamResults);

// Get all uploaded exams (for teacher/admin)
router.get("/", authenticateToken, getAllUploadedExams);

// Get results for a specific student
router.get("/:admissionNumber", authenticateToken, getStudentResults);

router.get(
  "/:admissionNumber/:examType/:term/:year/pdf",
  authenticateToken,
  getExamResultPDF
);

export default router;