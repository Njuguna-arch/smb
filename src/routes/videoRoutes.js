import express from "express";
import {
  getVideos,
  addVideo,
  getFeaturedVideos,
} from "../controllers/videoController.js";
import { authenticateToken, authorizeRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, getVideos);

router.get("/featured", authenticateToken, getFeaturedVideos);

router.post("/", authenticateToken, authorizeRole("Admin", "Teacher"), addVideo);

export default router;