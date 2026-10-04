import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { CloudinaryStorage } from "../utils/cloudinaryStorage.js";

import {
  getQuizzes,
  submitQuiz,
  getSubjects,
  addQuiz,
  downloadQuiz,
} from "../controllers/quizController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Cloudinary storage setup for raw files (PDF/Word)
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "quizzes",
    resource_type: "raw",
    type: "upload",
    public_id: (req, file) => {
      const ext = file.originalname.split(".").pop();
      const rawBase = file.originalname.substring(0, file.originalname.lastIndexOf("."));
      const sanitizedBase = (rawBase || "quiz")
        .replace(/[^a-zA-Z0-9_-]/g, "_")
        .replace(/_+/g, "_")
        .replace(/^_|_$/g, "");
      return `${Date.now()}-${sanitizedBase}.${ext}`;
    },
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

router.get("/download/:quizId", authenticateToken, downloadQuiz);

export default router;
