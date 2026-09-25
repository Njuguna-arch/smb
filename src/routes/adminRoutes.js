import express from "express";
import {
  getUsers,
  createUser,
  deleteUser,
  getAnnouncements,
  createAnnouncement,
} from "../controllers/adminController.js";
import { getSchoolPerformance } from "../controllers/examController.js";

const router = express.Router();

router.get("/performance", getSchoolPerformance);

router.get("/users", getUsers);
router.post("/users", createUser);
router.delete("/users/:id", deleteUser);

router.get("/announcements", getAnnouncements);
router.post("/announcements", createAnnouncement);

export default router;