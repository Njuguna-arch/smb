import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
  message: { type: String },
  fileUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Announcement", announcementSchema);