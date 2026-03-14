import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import {
  BCRYPT_SALT_ROUNDS,
  SESSION_SECRET,
  JWT_EXPIRY,
} from "../_CONFIGURATIONS/_config.index.js";

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
    return null;
  }
};

/**
 * Generates a cryptographically random 16-char alphanumeric access code.
 * Uses crypto.randomBytes for security — not Math.random.
 */
export const generateAccessCode = () => {
  return crypto.randomBytes(12).toString("base64url").slice(0, 16);
};
