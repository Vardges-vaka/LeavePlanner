import winston from "winston";
const { printf } = winston.format;

const devFormat = printf(
  ({ level, message, timestamp: ts, layer, file, event, errorDetails }) => {
    const base = `${ts} [${level}] [${layer}] ${event} | ${file}`;
    return errorDetails ? `${base}\n  └─ ${errorDetails}` : base;
  },
);

const fileFormat = printf(
  ({ level, timestamp: ts, layer, file, event, errorDetails }) => {
    const plainEvent = event.replace(/[^\x20-\x7E[\]]/g, "").trim();
    const base = `${ts} [${level.toUpperCase()}] [${layer}] ${plainEvent} | ${file}`;
    return errorDetails ? `${base} | ${errorDetails}` : base;
  },
);

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

export { devFormat, fileFormat, formatError };
