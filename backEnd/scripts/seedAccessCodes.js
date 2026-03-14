/**
 * Temporary CLI script — generates 10 super-admin access codes,
 * hashes them, stores the hashes in the Access collection,
 * and prints the plain-text codes to the console.
 *
 * Usage:  npm run seed   (or)   node scripts/seedAccessCodes.js
 */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 12;
const CODE_COUNT = 10;
const CODE_LENGTH = 16;

// Inline Access model to keep the script self-contained
const accessSchema = new mongoose.Schema(
  {
    newCodes: {
      guest: [String],
      user: [
        {
          hash: { type: String, required: true },
          assignedEmail: { type: String, required: true },
        },
      ],
      admin: [
        {
          hash: { type: String, required: true },
          assignedEmail: { type: String, required: true },
        },
      ],
      superAdmin: [String],
    },
    usedCodes: [
      {
        code: String,
        role: String,
        usedAt: Date,
        usedIP: String,
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        userAgent: String,
        accountEmail: String,
        accountName: String,
      },
    ],
    blacklist: {
      tokens: { pswReset: [String], logOut: [String] },
      ips: [String],
    },
  },
  { timestamps: true },
);

const Access =
  mongoose.models.Access || mongoose.model("Access", accessSchema);

const seed = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("📤🌐📡 Connected to DB for seeding");

    // Find or create singleton Access doc
    let accessDoc = await Access.findOne();
    if (!accessDoc) {
      accessDoc = await Access.create({});
      console.log("📄 Created new Access document");
    }

    const plainCodes = [];
    const hashedCodes = [];

    for (let i = 0; i < CODE_COUNT; i++) {
      const code = crypto.randomBytes(12).toString("base64url").slice(0, CODE_LENGTH);
      const hash = await bcrypt.hash(code, BCRYPT_SALT_ROUNDS);
      plainCodes.push(code);
      hashedCodes.push(hash);
    }

    accessDoc.newCodes.superAdmin.push(...hashedCodes);
    await accessDoc.save();

    console.log("\n✅ 10 Super-Admin access codes generated and stored.\n");
    console.log("╔══════════════════════════════════════╗");
    console.log("║   COPY THESE CODES — SHOWN ONCE!     ║");
    console.log("╠══════════════════════════════════════╣");
    plainCodes.forEach((code, idx) => {
      console.log(`║  ${String(idx + 1).padStart(2, " ")}. ${code.padEnd(20, " ")}       ║`);
    });
    console.log("╚══════════════════════════════════════╝\n");
  } catch (error) {
    console.error("❌ Seed failed:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from DB");
  }
};

seed();
