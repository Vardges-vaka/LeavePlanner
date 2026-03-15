import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("📤🌐📡 DATABASE CONNECTED ✅");
  } catch (error) {
    console.error("❌ DATABASE CONNECTION FAILED:", error.message);
    process.exit(1);
  }
};

export default connectDB;
