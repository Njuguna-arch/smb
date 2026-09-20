import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String, required: true },
  thumbnailUrl: { type: String },
  subject: { type: String, required: true },
  grade: { type: String, required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  schoolCode: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Video", videoSchema);
