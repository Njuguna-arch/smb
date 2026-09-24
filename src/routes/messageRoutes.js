import express from "express";
import multer from "multer";
import * as xlsx from "xlsx";
import SentMessage from "../models/SentMessage.js";
import fs from "fs";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/messages");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.get("/", authenticateToken, async (req, res) => {
  try {
    const query = req.user.role === "superadmin" ? {} : { schoolCode: req.user.schoolCode };
    const messages = await SentMessage.find(query).sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sent messages" });
  }
});

router.post("/bulk", authenticateToken, upload.single("file"), async (req, res) => {
  try {
    const { channel, message, pastedContacts } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }
    if (!channel || !["sms", "whatsapp"].includes(channel)) {
      return res.status(400).json({ error: "Valid channel is required" });
    }

    let contacts = new Set();
    if (pastedContacts) {
      const parsed = pastedContacts.split(/[\n,;]+/).map(c => c.trim()).filter(c => c);
      parsed.forEach(c => contacts.add(c));
    }

    if (req.file) {
      const filePath = req.file.path;
      const workbook = xlsx.readFile(filePath);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
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
    if (uniqueContacts.length === 0) return res.status(400).json({ error: "No valid contacts provided" });

    if (channel === "sms") {
      const { AFRICASTALKING_USERNAME, AFRICASTALKING_API_KEY } = process.env;
      if (AFRICASTALKING_USERNAME && AFRICASTALKING_API_KEY) {
        const africastalkingModule = await import("africastalking");
        const africastalking = africastalkingModule.default({ apiKey: AFRICASTALKING_API_KEY, username: AFRICASTALKING_USERNAME });
        try { await africastalking.SMS.send({ to: uniqueContacts, message }); } catch (err) { console.error(err); }
      }
    }

    const sentMessage = new SentMessage({ channel, message, recipientCount: uniqueContacts.length, schoolCode: req.user.schoolCode });
    await sentMessage.save();
    res.json({ success: true, sentCount: uniqueContacts.length, sentMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send bulk messages" });
  }
});
export default router;
