import dotenv from "dotenv";

dotenv.config();

const args = process.argv.slice(2);

let NODE_ENV = "development"; // ! Default environment

for (let arg of args) {
  if (arg.startsWith("--env=")) {
    NODE_ENV = arg.split("=")[1];
    break;
  }
}
const corsOptions = {
  origin: "http://localhost:3330", // frontend url
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const SERVER_PORT = parseInt(process.env.SERVER_PORT, 10) || 5000; // Default port 5000

const SESSION_EXPIRY =
  parseInt(process.env.SESSION_EXPIRY, 10) || 45 * 60 * 1000;

const setCSPHeader = (req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; font-src 'self' https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
  );
  next();
};

export { SERVER_PORT, SESSION_EXPIRY, NODE_ENV, corsOptions, setCSPHeader };
