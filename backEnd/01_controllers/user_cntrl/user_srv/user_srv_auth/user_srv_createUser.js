import {
  consoleLog,
  debug_msg,
} from "../../../../06_helpers/_helpers.index.js";

const displayName = "user_srv_createUser.js";

const DEBUG = (m, e, isDebug) => consoleLog("srv", displayName, isDebug, m, e);

const user_srv_createUser = async (isDebug, req) => {
  const DEBUG_LOG = (m, e) => DEBUG(m, e, isDebug);
  DEBUG_LOG(debug_msg.start);
  try {
    return { success: true, message: "Success", data: {} };
  } catch (error) {
    DEBUG_LOG(debug_msg.error_E, error);
  } finally {
    DEBUG_LOG(debug_msg.end);
  }
};

export { user_srv_createUser };
