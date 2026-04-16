import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import {
  getQuizzes,
  submitQuiz,
  getSubjects,
  addQuiz,
  downloadQuiz, 
} from "../controllers/quizController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join("uploads", "quizzes");
    // Ensure folder exists
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Get quizzes for student
router.get("/", authenticateToken, getQuizzes);

// Submit quiz answers
router.post("/submit", authenticateToken, submitQuiz);

// Get distinct subjects
router.get("/subjects", authenticateToken, getSubjects);

// Teacher uploads quiz
router.post(
  "/",
  authenticateToken,
  upload.single("quizFile"),
  addQuiz
);

router.get("/download/:quizId", authenticateToken, downloadQuiz);

export default router;
