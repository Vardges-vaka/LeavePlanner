import {
  consoleLog,
  debug_msg,
} from "../../../../06_helpers/_helpers.index.js";

const displayName = "user_vld_createUser.js";
const isDebug = true;
const DEBUG_LOG = (m, e) => consoleLog("vld", displayName, isDebug, m, e);

const user_vld_createUser = async (req) => {
  try {
    DEBUG_LOG(debug_msg.start);
    let sanitizedData = {};
    const data = req.body.payload;
    if (typeof rememberMe !== "boolean") {
      DEBUG_LOG(debug_msg.start);
      sanitizedData.isValid = false;
    }
    sanitizedData.isValid = true;
    return sanitizedData;
  } catch (error) {
    DEBUG_LOG(debug_msg.error_E, error);
  } finally {
    DEBUG_LOG(debug_msg.end);
  }
};

export { user_vld_createUser };
