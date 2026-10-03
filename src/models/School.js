import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    address: { type: String, trim: true },
    phone: { type: String, trim: true },
    status: {
      type: String,
      enum: ["active", "disabled"],
      default: "active",
      index: true,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    adminName: { type: String, trim: true },
    adminEmail: { type: String, lowercase: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("School", schoolSchema);
