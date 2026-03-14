import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  BCRYPT_SALT_ROUNDS,
  SESSION_SECRET,
  JWT_EXPIRY,
} from "../_CONFIGURATIONS/_config.index.js";

dotenv.config();

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
};

export const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const generateJWT = (payload, expiry = JWT_EXPIRY) => {
  return jwt.sign(payload, SESSION_SECRET, {
    expiresIn: expiry,
  });
};

export const verifyJWT = (token) => {
  try {
    return jwt.verify(token, SESSION_SECRET);
  } catch (error) {
    return null; // Invalid or expired token
  }
};
