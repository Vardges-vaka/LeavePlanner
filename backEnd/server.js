import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
// import mongoose from "mongoose";
import i18nMiddleware from "i18next-http-middleware";

import {
  // SERVER_PORT,
  // connectDB,
  corsOptions,
  createSessionMW,
  staticConfig,
  startServer,
} from "./_CONFIGURATIONS/_config.index.js";

import {
  cacheControl,
  apiLimiter,
  requestLogger_mw,
  globalErrorHandler,
  notFoundHandler,
} from "./03_middlewares/_middlewares.index.js";

import { userRoutes } from "./02_routes/_routes.index.js";
import { i18n } from "./05_i18n/_i18n.index.js";

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
app.use(staticConfig());

// -- Request logging
app.use(requestLogger_mw);

// -- Routes
// ------------------------------------------------------------
app.use("/api/users", userRoutes);
// ------------------------------------------------------------

// ! 404 handler
app.use(notFoundHandler);

// ! Global error handler
app.use(globalErrorHandler);

// -- Start
// const startServer = async () => {
//   await connectDB();
//   const server = app.listen(SERVER_PORT, () => {
//     console.log(`✅💻📟 [SERVER] 🔗 [PORT: ${SERVER_PORT}] Connected `);
//   });

//   // Graceful shutdown
//   const shutdown = async (signal) => {
//     console.log(`\n⏳ ${signal} received — shutting down gracefully...`);
//     server.close(async () => {
//       await mongoose.connection.close();
//       console.log("🔌 DB disconnected. Server stopped.");
//       process.exit(0);
//     });
//   };

//   process.on("SIGTERM", () => shutdown("SIGTERM"));
//   process.on("SIGINT", () => shutdown("SIGINT"));
// };

startServer(app);

export default app;
