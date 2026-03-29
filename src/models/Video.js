import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  grade: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String, required: true },
  type: { 
    type: String, 
    enum: ["Educational", "Entertainment"],
    default: "Educational" 
  },
  featured: { type: Boolean, default: false },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Video", videoSchema);