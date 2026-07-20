import express from "express";
import {
  uploadExamCSV,
  addDisciplineComment,
  getStudentCompletedQuizzes,
} from "../controllers/teacherController.js";
import { getClassPerformance } from "../controllers/examController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/exam/csv", authenticateToken, (req, res, next) => {
  if (!req.user.role || req.user.role.toLowerCase() !== "teacher") {
    return res.status(403).json({ message: "Forbidden: Only teachers can upload exams" });
  }
  next();
}, uploadExamCSV);

router.post("/discipline", authenticateToken, (req, res, next) => {
  if (!req.user.role || req.user.role.toLowerCase() !== "teacher") {
    return res.status(403).json({ message: "Forbidden: Only teachers can add discipline comments" });
  }
  next();
}, addDisciplineComment);

router.get("/performance", authenticateToken, (req, res, next) => {
  if (!req.user.role || req.user.role.toLowerCase() !== "teacher") {
    return res.status(403).json({ message: "Forbidden: Only teachers can view class performance" });
  }
  next();
}, getClassPerformance);

router.get("/:studentId/completed-quizzes", authenticateToken, getStudentCompletedQuizzes);

export default router;
