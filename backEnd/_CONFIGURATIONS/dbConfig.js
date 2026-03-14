import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  await mongoose.connect(MONGODB_URI).then(() => {
    console.log("📤🌐📡 DATABASE CONNECTED ✅");
  });
};

export default connectDB;
