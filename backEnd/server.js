import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import session from "express-session";

import {
  SERVER_PORT,
  SESSION_EXPIRY,
  NODE_ENV,
  corsOptions,
  setCSPHeader,
  connectDB,
  session_mw,
  cookieConfig,
} from "./_CONFIGURATIONS/_config.index.js";
import { cacheControl } from "./03_middlewares/_middlewares.index.js";
import { userRoutes } from "./02_routes/_routes.index.js";

const app = express();
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session_mw);
app.use(cacheControl);

app.use(cookieConfig());

connectDB();

// Routes
app.use("/api/users", userRoutes);

app.use(setCSPHeader);

app.listen(SERVER_PORT, () => {
  console.log(`✅💻📟 [SERVER] 🔗 [PORT: ${SERVER_PORT}] Connected `);
});

export default app;
