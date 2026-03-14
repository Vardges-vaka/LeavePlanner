import { debug_msg } from "./debugging/console_msg.js";
import { consoleLog } from "./_helpers.index.js";

export const validRespond_cntrl = (success, message, data, DEBUG_LOG, res) => {
  if (success) {
    DEBUG_LOG(debug_msg.success, null);
    return res
      .status(200)
      .json({ success: true, message: message, data: data });
  } else {
    DEBUG_LOG(debug_msg.error_E, null);
    return res
      .status(202)
      .json({ success: false, message: message, data: data });
  }
};

export const failed_vld = (displayName, isDebug, message) => {
  consoleLog("vld", displayName, isDebug, debug_msg.error_E, null);
  return { isValid: false, validatorMessage: message };
};
