import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import {
  SERVER_PORT,
  corsOptions,
  setCSPHeader,
  connectDB,
  session_mw,
  cookieConfig,
} from "./_CONFIGURATIONS/_config.index.js";
import { cacheControl } from "./03_middlewares/_middlewares.index.js";
import { userRoutes } from "./02_routes/_routes.index.js";
import i18nMiddleware from "i18next-http-middleware";
import { i18n } from "./05_i18n/_i18n.index.js";

const app = express();

app.use(cors(corsOptions));
app.use(setCSPHeader);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session_mw);
app.use(cacheControl);
app.use(i18nMiddleware.handle(i18n));
app.use(cookieConfig());

// Routes
app.use("/api/users", userRoutes);

const startServer = async () => {
  await connectDB();
  app.listen(SERVER_PORT, () => {
    console.log(`✅💻📟 [SERVER] 🔗 [PORT: ${SERVER_PORT}] Connected `);
  });
};

startServer();

export default app;
