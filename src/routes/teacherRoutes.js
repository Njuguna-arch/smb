import express from "express";
import {
  uploadExamCSV,
  addDisciplineComment,
  getClassPerformance,
  getStudentCompletedQuizzes,
} from "../controllers/teacherController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/exam/csv", authenticateToken, uploadExamCSV);

router.post("/discipline", authenticateToken, addDisciplineComment);

router.get("/performance", authenticateToken, getClassPerformance);

router.get("/:studentId/completed-quizzes", authenticateToken, getStudentCompletedQuizzes);

export default router;