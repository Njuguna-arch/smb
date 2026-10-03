import mongoose from "mongoose";

const systemSettingSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: "global_settings",
    },
    platformName: {
      type: String,
      default: "EduSphere School Management System",
    },
    supportEmail: {
      type: String,
      default: "support@edusphere.com",
    },
    maintenanceMode: {
      type: Boolean,
      default: false,
    },
    allowRegistration: {
      type: Boolean,
      default: true,
    },
    academicYear: {
      type: Number,
      default: 2026,
    },
    currentTerm: {
      type: String,
      default: "Term 1",
    },
    logRetentionDays: {
      type: Number,
      default: 90,
    },
  },
  { timestamps: true }
);

export default mongoose.model("SystemSetting", systemSettingSchema);
