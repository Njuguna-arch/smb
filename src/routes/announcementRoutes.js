import express from "express";
import multer from "multer";
import * as xlsx from "xlsx";
import twilio from "twilio";
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
    const fileUrl = `/uploads/announcements/${req.file.filename}`;
    const announcement = new Announcement({ fileUrl, schoolCode: req.user.schoolCode });
    await announcement.save();
    res.json(announcement);
  } catch (err) {
    res.status(500).json({ error: "Failed to post file announcement" });
  }
});

// Bulk messaging route
router.post("/bulk", upload.single("file"), async (req, res) => {
  try {
    const { channel, message, pastedContacts } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }
    if (!channel || !["sms", "whatsapp"].includes(channel)) {
      return res.status(400).json({ error: "Valid channel (sms/whatsapp) is required" });
    }

    let contacts = new Set();

    // Process pasted contacts
    if (pastedContacts) {
      const parsed = pastedContacts.split(/[\n,;]+/).map(c => c.trim()).filter(c => c);
      parsed.forEach(c => contacts.add(c));
    }

    // Process file contacts
    if (req.file) {
      const filePath = req.file.path;
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
      
      data.flat().forEach(cell => {
        if (cell) {
          const strCell = String(cell).replace(/\s+/g, "");
          if (/^\+?\d{8,15}$/.test(strCell)) {
            contacts.add(strCell);
          }
        }
      });
      fs.unlinkSync(filePath);
    }

    const uniqueContacts = Array.from(contacts);
    if (uniqueContacts.length === 0) {
      return res.status(400).json({ error: "No valid contacts provided" });
    }

    if (channel === "sms") {
      const { AFRICASTALKING_USERNAME, AFRICASTALKING_API_KEY } = process.env;
      
      if (!AFRICASTALKING_USERNAME || !AFRICASTALKING_API_KEY) {
        console.warn("Africa's Talking credentials missing. Skipping actual SMS sending, but registering announcement.");
      } else {
        const africastalkingModule = await import("africastalking");
        const africastalking = africastalkingModule.default({
          apiKey: AFRICASTALKING_API_KEY,
          username: AFRICASTALKING_USERNAME
        });
        
        const sms = africastalking.SMS;
        
        try {
          await sms.send({
            to: uniqueContacts,
            message: message,
          });
          console.log(`Successfully sent SMS to ${uniqueContacts.length} recipients via Africa's Talking`);
        } catch (err) {
          console.error("Failed to send SMS via Africa's Talking:", err);
        }
      }
    } else if (channel === "whatsapp") {
      console.log(`WhatsApp logic triggered for ${uniqueContacts.length} contacts. Integrate provider here.`);
    }

    const announcement = new Announcement({ message: `[Bulk ${channel.toUpperCase()}] ${message}`, schoolCode: req.user.schoolCode });
    await announcement.save();

    res.json({ success: true, sentCount: uniqueContacts.length, announcement });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send bulk messages" });
  }
});

export default router;
