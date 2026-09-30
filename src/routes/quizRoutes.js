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

// Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "quizzes",              // Cloudinary folder
    resource_type: "raw",           // allows PDF/Word uploads
    type: "upload",
    format: (req, file) => file.originalname.split(".").pop(), // keep extension
    public_id: (req, file) => Date.now() + "-" + file.originalname,
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
