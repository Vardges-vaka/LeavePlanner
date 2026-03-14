import dotenv from "dotenv";

dotenv.config();

const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 12; // ? 12 salt rounds fallback

const JWT_EXPIRY = process.env.JWT_EXPIRY || "10d"; // ? 100 days fallback

const JWT_RESET_EXPIRY = process.env.JWT_RESET_EXPIRY || "30m"; // ? 30 minutes for password reset

export { BCRYPT_SALT_ROUNDS, JWT_EXPIRY, JWT_RESET_EXPIRY };
