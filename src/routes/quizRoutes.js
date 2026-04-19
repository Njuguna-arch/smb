import express from "express";
import multer from "multer";
import CloudinaryStorage from "../config/cloudinaryStorage.js";  // import the bridge
import cloudinary from "../config/cloudinary.js";
import {
  getQuizzes,
  submitQuiz,
  getSubjects,
  addQuiz,
  downloadQuiz,
} from "../controllers/quizController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "quizzes",              // Cloudinary folder
    resource_type: "raw",           // allows PDF/Word uploads
    format: (req, file) => file.originalname.split(".").pop(), // keep extension
    public_id: (req, file) => Date.now() + "-" + file.originalname,
  },
});

const upload = multer({ storage });

// Get quizzes for student
router.get("/", authenticateToken, getQuizzes);

// Submit quiz answers
router.post("/submit", authenticateToken, submitQuiz);

// Get distinct subjects
router.get("/subjects", authenticateToken, getSubjects);

// Teacher uploads quiz (file or MCQ)
router.post(
  "/",
  authenticateToken,
  upload.single("quizFile"),
  addQuiz
);

// Student downloads quiz (redirects to Cloudinary URL)
router.get("/download/:quizId", authenticateToken, downloadQuiz);

export default router;
