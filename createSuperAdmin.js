import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/models/User.js";

dotenv.config();

const createSuperAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const existing = await User.findOne({ role: "superadmin" });
    if (existing) {
      console.log("Superadmin already exists:", existing.email);
      process.exit(0);
    }

    const superadmin = new User({
      name: "Super Admin",
      email: "super@admin.com",
      password: "password123",
      role: "superadmin"
    });

    await superadmin.save();
    console.log("Superadmin created successfully! Email: super@admin.com, Password: password123");
    process.exit(0);
  } catch (err) {
    console.error("Error creating superadmin:", err);
    process.exit(1);
  }
};

createSuperAdmin();
