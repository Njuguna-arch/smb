import mongoose from "mongoose";

const systemLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      index: true,
    },
    details: {
      type: String,
      required: true,
    },
    performedBy: {
      type: String,
      default: "System",
    },
    performedByRole: {
      type: String,
      default: "system",
    },
    schoolCode: {
      type: String,
      trim: true,
      index: true,
    },
    level: {
      type: String,
      enum: ["info", "warning", "error"],
      default: "info",
      index: true,
    },
    ipAddress: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const logActivity = async ({
  action,
  details,
  performedBy = "System",
  performedByRole = "system",
  schoolCode = null,
  level = "info",
  ipAddress = "",
}) => {
  try {
    const SystemLog = mongoose.model("SystemLog");
    await SystemLog.create({
      action,
      details: typeof details === "object" ? JSON.stringify(details) : String(details),
      performedBy,
      performedByRole,
      schoolCode,
      level,
      ipAddress,
    });
  } catch (err) {
    console.error("Failed to write system log:", err.message);
  }
};

export default mongoose.model("SystemLog", systemLogSchema);
