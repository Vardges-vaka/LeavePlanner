import winston from "winston";
import path from "path";
import { fileURLToPath } from "url";
import { devFormat, fileFormat, formatError } from "./logger_helper.js";
import { LABEL, TYPE_TAG, VALID_TYPES, VALID_MSGS } from "./logger_const.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOGS_DIR = path.resolve(__dirname, "../../../_logs");

const { combine, timestamp, colorize, errors } = winston.format;

const winstonLogger = winston.createLogger({
  level: "debug",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
  ),
  transports: [
    // Console: colorized, short timestamps
    new winston.transports.Console({
      format: combine(
        timestamp({ format: "HH:mm:ss" }),
        colorize({ level: true }),
        devFormat,
      ),
    }),

    // Combined log: all levels
    new winston.transports.File({
      filename: path.join(LOGS_DIR, "combined.log"),
      format: fileFormat,
      maxsize: 5 * 1024 * 1024, // 5 MB per file
      maxFiles: 3,
    }),

    // Error log: errors only
    new winston.transports.File({
      filename: path.join(LOGS_DIR, "error.log"),
      level: "error",
      format: fileFormat,
      maxsize: 5 * 1024 * 1024,
      maxFiles: 5,
    }),
  ],
});

/**
 * Drop-in replacement for the old `console_logs`.
 * Same signature: consoleLog(type, displayName, isDebug, msg, error)
 *
 * @param {string} type        - Layer: "srv" | "cntrl" | "vld" | "mw"
 * @param {string} displayName - Source file name (e.g. "user_srv_signUpUser.js")
 * @param {boolean} isDebug    - If false, skips logging entirely
 * @param {string} msg         - Event code: "start" | "end" | "error_E" | "success" | "data"
 * @param {Error|null} error   - Optional error object
 */

const consoleLog = (type, displayName, isDebug, msg, error) => {
  if (isDebug === false) return;

  if (
    !type ||
    !displayName ||
    !msg ||
    !VALID_TYPES.includes(type) ||
    !VALID_MSGS.includes(msg)
  ) {
    winstonLogger.warn("Invalid logger parameters", {
      layer: "LOGGER",
      file: "logger.js",
      event: "⚠️  BAD_PARAMS",
    });
    return;
  }

  const label = LABEL[msg];
  const layer = TYPE_TAG[type];
  const event = `${label.icon}  [${label.tag}]`;
  const errorDetails = error ? formatError(error) : undefined;

  // error_E → winston error level; everything else → info
  const logLevel = msg === "error_E" ? "error" : "info";

  winstonLogger.log(logLevel, "", {
    layer,
    file: displayName,
    event,
    errorDetails,
  });
};

export default consoleLog;
