import express from "express";
import multer from "multer";
import multerStorageCloudinary from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import {
  getQuizzes,
  submitQuiz,
  getSubjects,
  addQuiz,
  downloadQuiz,
} from "../controllers/quizController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const { CloudinaryStorage } = multerStorageCloudinary;

const router = express.Router();

// Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "quizzes",
    resource_type: "raw",
    format: async (req, file) => {
      const ext = file.originalname.split(".").pop();
      return ext;
    },
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

// Teacher uploads quiz
router.post(
  "/",
  authenticateToken,
  upload.single("quizFile"),
  addQuiz
);

// Student downloads quiz
router.get("/download/:quizId", authenticateToken, downloadQuiz);

export default router;
