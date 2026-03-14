import {
  consoleLog,
  debug_msg,
} from "../../../../06_helpers/_helpers.index.js";

const displayName = "user_vld_logOutUser.js";
const isDebug = true;
const DEBUG_LOG = (m, e) => consoleLog("vld", displayName, isDebug, m, e);

/**
 * LogOut validator — minimal since the token comes from the cookie,
 * not the request body. Just passes through.
 */
const user_vld_logOutUser = async (req) => {
  try {
    DEBUG_LOG(debug_msg.start);
    return { isValid: true, data: {} };
  } catch (error) {
    DEBUG_LOG(debug_msg.error_E, error);
    return { isValid: false, validatorMessage: "Validation error" };
  } finally {
    DEBUG_LOG(debug_msg.end);
  }
};

export { user_vld_logOutUser };
