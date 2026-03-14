import winston from "winston";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOGS_DIR = path.resolve(__dirname, "../../../_logs");

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

// ── Valid layer types and message codes ──
export const VALID_TYPES = ["srv", "cntrl", "vld", "mw"];
export const VALID_MSGS = ["start", "end", "error_E", "success", "data"];

export const debug_msg = {
  start: "start",
  end: "end",
  error_E: "error_E",
  success: "success",
  data: "data",
};

// ── Label map: message code → icon + tag ──
const LABEL = {
  start: { icon: "🚩", tag: "STARTED" },
  end: { icon: "🏁", tag: "FINALLY" },
  error_E: { icon: "🛑", tag: "ERROR" },
  success: { icon: "✅", tag: "SUCCESS" },
  data: { icon: "📶", tag: "DATA" },
};

// ── Type tag for the layer ──
const TYPE_TAG = {
  srv: "SRV",
  cntrl: "CNTRL",
  vld: "VLD",
  mw: "MW",
};

// ── Nicely format an error object ──
const formatError = (error) => {
  if (!error) return "";
  const parts = [];
  if (error.message) parts.push(`message: ${error.message}`);
  if (error.name) parts.push(`name: ${error.name}`);
  if (error.code) parts.push(`code: ${error.code}`);
  if (error.status) parts.push(`status: ${error.status}`);
  if (error.stack) parts.push(`stack: ${error.stack}`);
  return parts.join(" | ");
};

// ── Custom print format for development console ──
const devFormat = printf(({ level, message, timestamp: ts, layer, file, event, errorDetails }) => {
  const base = `${ts} [${level}] [${layer}] ${event} | ${file}`;
  return errorDetails ? `${base}\n  └─ ${errorDetails}` : base;
});

// ── Clean format for log files (no emojis, no ANSI colors, full timestamp) ──
const fileFormat = printf(({ level, timestamp: ts, layer, file, event, errorDetails }) => {
  const plainEvent = event.replace(/[^\x20-\x7E[\]]/g, "").trim();
  const base = `${ts} [${level.toUpperCase()}] [${layer}] ${plainEvent} | ${file}`;
  return errorDetails ? `${base} | ${errorDetails}` : base;
});

// ── Winston instance ──
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

  if (!type || !displayName || !msg || !VALID_TYPES.includes(type) || !VALID_MSGS.includes(msg)) {
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
