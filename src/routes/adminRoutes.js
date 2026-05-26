import express from "express";
import {
  getUsers,
  createUser,
  deleteUser,
  getAnnouncements,
  createAnnouncement,
} from "../controllers/adminController.js";
import { getSchoolPerformance } from "../controllers/examController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔹 Admin-only school performance
router.get("/performance", authenticateToken, getSchoolPerformance);

// 🔹 Admin-only user management
router.get("/users", authenticateToken, getUsers);
router.post("/users", authenticateToken, createUser);
router.delete("/users/:id", authenticateToken, deleteUser);

// 🔹 Admin-only announcements
router.get("/announcements", authenticateToken, getAnnouncements);
router.post("/announcements", authenticateToken, createAnnouncement);

export default router;
