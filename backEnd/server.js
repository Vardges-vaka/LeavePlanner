import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import i18nMiddleware from "i18next-http-middleware";

import {
  SERVER_PORT,
  corsOptions,
  connectDB,
  createSessionMW,
  cookieConfig,
} from "./_CONFIGURATIONS/_config.index.js";
import {
  cacheControl,
  apiLimiter,
} from "./03_middlewares/_middlewares.index.js";
import { userRoutes } from "./02_routes/_routes.index.js";
import { i18n } from "./05_i18n/_i18n.index.js";
import consoleLog from "./06_helpers/logging/logger.js";

const app = express();

// -- Security
app.use(helmet());
app.use(cors(corsOptions));
app.use(apiLimiter);

// -- Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// -- Session & caching (lazy init — env vars must be loaded first)
const { middleware: session_mw } = createSessionMW();
app.use(session_mw);
app.use(cacheControl);

// -- i18n & static
app.use(i18nMiddleware.handle(i18n));
app.use(cookieConfig());

// -- Request logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const ms = Date.now() - start;
    const log = `${req.method} ${req.originalUrl} ${res.statusCode} ${ms}ms`;
    const level = res.statusCode >= 400 ? "error" : "info";
    consoleLog("mw", log, true, level === "error" ? "error_E" : "data", null);
  });
  next();
});

// -- Routes
app.use("/api/users", userRoutes);

// -- 404 handler (must be after all routes)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    data: null,
  });
});

// -- Global error handler (must be last, 4 params required)
app.use((err, req, res, next) => {
  consoleLog("mw", "globalErrorHandler", true, "error_E", err);
  res.status(err.status || 500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
    data: null,
  });
});

// -- Start
const startServer = async () => {
  await connectDB();
  const server = app.listen(SERVER_PORT, () => {
    console.log(`✅💻📟 [SERVER] 🔗 [PORT: ${SERVER_PORT}] Connected `);
  });

  // Graceful shutdown
  const shutdown = async (signal) => {
    console.log(`\n⏳ ${signal} received — shutting down gracefully...`);
    server.close(async () => {
      await mongoose.connection.close();
      console.log("🔌 DB disconnected. Server stopped.");
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
};

startServer();

export default app;
