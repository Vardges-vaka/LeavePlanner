import { isRequestLogging } from "../_CONFIGURATIONS/_config.index.js";
import { consoleLog } from "../06_helpers/_helpers.index.js";

export const requestLogger_mw = (req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const ms = Date.now() - start;
    const log = `${req.method} ${req.originalUrl} ${res.statusCode} ${ms}ms`;
    const level = res.statusCode >= 400 ? "error" : "info";
    consoleLog(
      "mw",
      log,
      isRequestLogging,
      level === "error" ? "error_E" : "data",
      null,
    );
  });
  next();
};
