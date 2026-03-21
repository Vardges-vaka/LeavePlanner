import consoleLog from "./logging/logger.js";
import { debug_msg } from "./logging/logger_const.js";

/**
 * Centralized API response helper for controllers.
 *
 * Guarantees a consistent JSON shape:
 * - `{ success: boolean, message: string, data: any | null }`
 *
 * Status code rules:
 * - If `statusCode` is provided (not null/undefined), it will be used.
 * - Otherwise defaults to:
 *   - `200` when `success === true`
 *   - `400` when `success === false`
 *
 * Logging:
 * - Calls `DEBUG_LOG(debug_msg.success)` on success
 * - Calls `DEBUG_LOG(debug_msg.error_E)` on failure
 *
 * @param {boolean} success - Operation outcome.
 * @param {string} message - Human-readable message for the client.
 * @param {*} data - Payload to return. If omitted/undefined, `data` becomes `null`.
 * @param {import("express").Response} res - Express response object.
 * @param {number | null | undefined} [statusCode] - Optional HTTP status override (e.g. 201, 401, 404).
 * @param {(msgCode: string, err: any) => void} DEBUG_LOG - Controller-scoped logger wrapper.
 * @returns {import("express").Response} Express response.
 *
 * @example
 * # Defaults (200 / 400)
 * return validRespond_cntrl(true, "Created", { id: 1 }, res, undefined, DEBUG_LOG);
 *
 * @example
 * # Custom status codes
 * return validRespond_cntrl(false, "Unauthorized", null, res, 401, DEBUG_LOG);
 */
export const validRespond_cntrl = (
  success,
  message,
  data,
  res,
  statusCode,
  DEBUG_LOG,
) => {
  const returnObject = {
    success: success,
    message: message,
    data: data !== undefined ? data : null,
  };
  const returnStatus = statusCode ?? (success ? 200 : 400);
  const debugMessage = success ? debug_msg.success : debug_msg.error_E;
  DEBUG_LOG(debugMessage, null);
  return res.status(returnStatus).json(returnObject);
};

export const failed_vld = (displayName, isDebug, message) => {
  consoleLog("vld", displayName, isDebug, debug_msg.error_E, null);
  return { isValid: false, validatorMessage: message };
};
