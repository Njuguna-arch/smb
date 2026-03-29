import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  grade: { type: String, required: true },

  type: { type: String, enum: ["mcq", "file"], required: true },

  question: { type: String },
  options: [{ type: String }],
  correctAnswer: { type: String },

  fileUrl: { type: String },
});

export default mongoose.model("Quiz", quizSchema);