import express from "express";
import multer from "multer";
import Announcement from "../models/AnnouncementModel.js";

const router = express.Router();

// configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/announcements");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// GET announcements
router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch announcements" });
  }
});

// POST text announcement
router.post("/text", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }
    const announcement = new Announcement({ message });
    await announcement.save();
    res.json(announcement);
  } catch (err) {
    res.status(500).json({ error: "Failed to post text announcement" });
  }
});

// POST file announcement
router.post("/file", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }
    const fileUrl = `/uploads/announcements/${req.file.filename}`;
    const announcement = new Announcement({ fileUrl });
    await announcement.save();
    res.json(announcement);
  } catch (err) {
    res.status(500).json({ error: "Failed to post file announcement" });
  }
});

export default router;