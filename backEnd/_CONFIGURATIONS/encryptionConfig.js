const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 12;

const JWT_SECRET = process.env.JWT_SECRET;

const JWT_EXPIRY = process.env.JWT_EXPIRY || "30d";

const JWT_RESET_EXPIRY = process.env.JWT_RESET_EXPIRY || "30m";

export { BCRYPT_SALT_ROUNDS, JWT_SECRET, JWT_EXPIRY, JWT_RESET_EXPIRY };
