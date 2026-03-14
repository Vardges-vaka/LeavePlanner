import mongoose from "mongoose";

const ROLES = ["user", "admin", "super_admin"];
const ACCESS_LEVELS = ["low", "medium", "high"];

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    dob: {
      type: Date,
      required: true,
    },
    contactDetails: {
      email: {
        type: String,
        required: true,
        unique: true,
      },
      phone: {
        type: String,
      },
      whatsapp: {
        type: String,
      },
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ROLES,
    },
    accessLevel: {
      type: String,
      required: true,
      enum: ACCESS_LEVELS,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    docs: [
      {
        link: { type: String },
        refference: { type: String },
      },
    ],
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
