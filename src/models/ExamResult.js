import mongoose from "mongoose";

const examResultSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
      index: true,
    },

    admissionNumber: {
      type: String,
      required: true,
      index: true,
    },

    examType: {
      type: String,
      enum: ["Opener", "Mid-Term", "End-Term"],
      required: true,
    },

    subjectResults: [
      {
        subjectName: { type: String, required: true },
        marks: { type: Number, required: true },
        grade: { type: String, required: true },
      },
    ],

    overallGrade: { type: String },

    overallComment: {
      type: String,
      default: "",
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    sourceFile: { type: String },

    term: {
      type: String,
      enum: ["Term 1", "Term 2", "Term 3"],
      required: true,
    },

    year: {
      type: Number,
      enum: [2026, 2027, 2028],
      required: true,
    },

    className: {
      type: String,
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

// Indexes for faster queries
examResultSchema.index({ admissionNumber: 1, examType: 1, year: 1 });
examResultSchema.index({ studentId: 1, examType: 1, year: 1 });
examResultSchema.index({ className: 1, examType: 1, year: 1 });

export default mongoose.model("ExamResult", examResultSchema);