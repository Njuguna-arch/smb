import express from "express";
import multer from "multer";
import Announcement from "../models/AnnouncementModel.js";
import fs from "fs";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authenticateToken);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/announcements");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const query = req.user.role === "superadmin" ? {} : { schoolCode: req.user.schoolCode };
    const announcements = await Announcement.find(query).sort({ createdAt: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch announcements" });
  }
});

router.post("/text", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });
    const announcement = new Announcement({ message, schoolCode: req.user.schoolCode });
    await announcement.save();
    res.json(announcement);
  } catch (err) {
    res.status(500).json({ error: "Failed to post text announcement" });
  }
});

router.post("/file", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "File is required" });
    const fileUrl = \/uploads/announcements/\\;
    const announcement = new Announcement({ fileUrl, schoolCode: req.user.schoolCode });
    await announcement.save();
    res.json(announcement);
  } catch (err) {
    res.status(500).json({ error: "Failed to post file announcement" });
  }
});

export default router;
