import express from "express";
import {
  getStudentById,
  updateStudentById,
  getCompletedQuizzes,
} from "../controllers/studentController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:id", authenticateToken, getStudentById);

router.put("/:id", authenticateToken, updateStudentById);

router.get("/:id/completed-quizzes", authenticateToken, getCompletedQuizzes);

export default router;