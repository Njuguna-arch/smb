import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
  message: { type: String },
  fileUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
  schoolCode: { type: String, required: true },
});

export default mongoose.model("Announcement", announcementSchema);
