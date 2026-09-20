import mongoose from "mongoose";

const disciplineSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  incidentType: {
    type: String,
    enum: [
      "noise making",
      "bullying",
      "late arrival",
      "disrespect",
      "cheating",
      "other",
    ],
    required: true,
  },
  description: { type: String, required: true },
  actionTaken: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["pending", "resolved", "escalated"],
    default: "pending",
  },
  schoolCode: { type: String, required: true },
});

export default mongoose.model("Discipline", disciplineSchema);
