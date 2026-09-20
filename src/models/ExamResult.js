import mongoose from "mongoose";

const examResultSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    term: {
      type: String,
      enum: ["Term 1", "Term 2", "Term 3"],
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    examType: {
      type: String,
      enum: ["Mid-Term", "End-Term", "Opener", "Mock"],
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    grade: {
      type: String,
      required: true,
    },
    remarks: {
      type: String,
    },
    recordedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    schoolCode: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("ExamResult", examResultSchema);
