import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import {
  getQuizzes,
  submitQuiz,
  getSubjects,
  addQuiz,
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

// Routes
router.get("/", authenticateToken, getQuizzes);

router.post("/submit", authenticateToken, submitQuiz);

router.get("/subjects", authenticateToken, getSubjects);

router.post(
  "/",
  authenticateToken,
  upload.single("quizFile"), // handles file upload
  addQuiz
);

export default router;