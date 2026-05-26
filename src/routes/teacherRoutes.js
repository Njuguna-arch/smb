import express from "express";
import {
  uploadExamCSV,
  addDisciplineComment,
  getClassPerformance,
  getStudentCompletedQuizzes,
} from "../controllers/teacherController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔹 Teacher-only exam upload
router.post("/exam/csv", authenticateToken, (req, res, next) => {
  if (req.user.role !== "teacher") {
    return res.status(403).json({ message: "Forbidden: Only teachers can upload exams" });
  }
  next();
}, uploadExamCSV);

// 🔹 Teacher-only discipline comments
router.post("/discipline", authenticateToken, (req, res, next) => {
  if (req.user.role !== "teacher") {
    return res.status(403).json({ message: "Forbidden: Only teachers can add discipline comments" });
  }
  next();
}, addDisciplineComment);

// 🔹 Teacher-only class performance
router.get("/performance", authenticateToken, (req, res, next) => {
  if (req.user.role !== "teacher") {
    return res.status(403).json({ message: "Forbidden: Only teachers can view class performance" });
  }
  next();
}, getClassPerformance);

// 🔹 Students can view their completed quizzes
router.get("/:studentId/completed-quizzes", authenticateToken, getStudentCompletedQuizzes);

export default router;
