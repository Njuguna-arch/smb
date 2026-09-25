import mongoose from "mongoose";

const disciplineSchema = new mongoose.Schema(
  {
    admissionNumber: {
      type: String,
      required: true,
      index: true, 
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    teacherName: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["Minor", "Major", "Warning", "Suspension"],
      default: "Minor",
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    severity: {
      type: Number,
      min: 1,
      max: 5,
      default: 1, 
    },
    term: {
      type: String, 
    },
    year: {
      type: Number,
      default: new Date().getFullYear(),
    },
    date: {
      type: Date,
      default: Date.now,
    },
    resolved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

disciplineSchema.index({ admissionNumber: 1, year: 1, term: 1 });
disciplineSchema.index({ teacherId: 1, date: -1 });

export default mongoose.model("Discipline", disciplineSchema);