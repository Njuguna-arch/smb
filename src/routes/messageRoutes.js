import express from "express";
import multer from "multer";
import * as xlsx from "xlsx";
import SentMessage from "../models/SentMessage.js";
import Announcement from "../models/AnnouncementModel.js";
import fs from "fs";
import { authenticateToken } from "../middleware/authMiddleware.js";
import sendCelcomSms from "../utils/celcomSms.js";

const router = express.Router();

const uploadDir = "uploads/messages";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const uploadMessage = multer({ storage });

export const handleBulkMessage = async (req, res) => {
  try {
    const { channel, message, pastedContacts } = req.body;
    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }
    if (!channel || !["sms", "whatsapp"].includes(channel.toLowerCase())) {
      return res.status(400).json({ error: "Valid channel is required (sms or whatsapp)" });
    }

    const selectedChannel = channel.toLowerCase();
    let contacts = new Set();

    if (pastedContacts) {
      const parsed = pastedContacts
        .split(/[\n,;]+/)
        .map((c) => c.replace(/[\s\-\(\)]/g, "").trim())
        .filter((c) => c);
      parsed.forEach((c) => contacts.add(c));
    }

    if (req.file) {
      const filePath = req.file.path;
      try {
        const workbook = xlsx.readFile(filePath);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

        data.flat().forEach((cell) => {
          if (cell !== undefined && cell !== null) {
            const strCell = String(cell).replace(/[\s\-\(\)]/g, "").trim();
            if (/^\+?\d{8,15}$/.test(strCell)) {
              contacts.add(strCell);
            }
          }
        });
      } finally {
        try {
          fs.unlinkSync(filePath);
        } catch (e) {
          // ignore unlink error
        }
      }
    }

    // Filter valid phone numbers (e.g. 0712345678, 254712345678, 712345678)
    const validContacts = Array.from(contacts).filter((c) => /^\+?\d{8,15}$/.test(c));

    if (validContacts.length === 0) {
      return res.status(400).json({ error: "No valid contacts provided. Please enter valid phone numbers." });
    }

    let smsApiResult = null;
    if (selectedChannel === "sms") {
      const apiKey = process.env.CELCOM_API_KEY || "124309f610521606b8d82bd240e7e0a6";
      if (apiKey) {
        try {
          const smsResult = await sendCelcomSms({ to: validContacts, message });
          smsApiResult = smsResult;
          if (!smsResult.success) {
            console.error("Celcom SMS Error:", smsResult.error, smsResult.data);
            return res.status(400).json({
              error: smsResult.error || "Celcom SMS delivery failed",
              details: smsResult.data,
            });
          }
        } catch (err) {
          console.error("Celcom SMS Exception:", err.message);
          return res.status(500).json({ error: err.message || "Failed to deliver SMS" });
        }
      } else {
        const { AFRICASTALKING_USERNAME, AFRICASTALKING_API_KEY } = process.env;
        if (AFRICASTALKING_USERNAME && AFRICASTALKING_API_KEY) {
          const africastalkingModule = await import("africastalking");
          const africastalking = africastalkingModule.default({
            apiKey: AFRICASTALKING_API_KEY,
            username: AFRICASTALKING_USERNAME,
          });
          try {
            await africastalking.SMS.send({ to: validContacts, message });
          } catch (err) {
            console.error(err);
          }
        }
      }
    }

    const schoolCode = req.user?.schoolCode || "GLOBAL";
    const sentMessage = new SentMessage({
      channel: selectedChannel,
      message,
      recipientCount: validContacts.length,
      schoolCode,
    });
    await sentMessage.save();

    let announcement = null;
    try {
      announcement = new Announcement({ message });
      await announcement.save();
    } catch (e) {
      console.error("Failed to mirror announcement:", e);
    }

    res.json({
      success: true,
      sentCount: validContacts.length,
      sentMessage,
      announcement,
      apiResult: smsApiResult?.data,
    });
  } catch (err) {
    console.error("Bulk message error:", err);
    res.status(500).json({ error: err.message || "Failed to send bulk messages" });
  }
};

router.get("/", authenticateToken, async (req, res) => {
  try {
    const query =
      req.user?.role === "superadmin" || !req.user?.schoolCode
        ? {}
        : { schoolCode: req.user.schoolCode };
    const messages = await SentMessage.find(query).sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sent messages" });
  }
});

router.post("/bulk", authenticateToken, uploadMessage.single("file"), handleBulkMessage);

export default router;

