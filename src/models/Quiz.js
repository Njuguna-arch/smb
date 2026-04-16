import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true }, 
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true } 
});

const quizSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  grade: { type: String, required: true },

  type: { type: String, enum: ["mcq", "file"], required: true },

  questions: [questionSchema],

  fileUrl: { type: String }
});

export default mongoose.model("Quiz", quizSchema);
