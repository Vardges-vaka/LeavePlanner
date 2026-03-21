import mongoose from "mongoose";
import { SERVER_PORT } from "./serverConfig.js";
import connectDB from "./dbConfig.js";

export const startServer = async (app) => {
  await connectDB();

  const server = app.listen(SERVER_PORT, () => {
    console.log(`✅💻📟 [SERVER] 🔗 [PORT: ${SERVER_PORT}] Connected`);
  });

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
