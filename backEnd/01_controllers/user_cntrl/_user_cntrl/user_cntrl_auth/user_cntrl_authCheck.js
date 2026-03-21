import {
  consoleLog,
  debug_msg,
  validRespond_cntrl,
} from "../../../../06_helpers/_helpers.index.js";

const displayName = "user_cntrl_authCheck.js";
const isDebug = true;
const DEBUG_LOG = (m, e) => consoleLog("cntrl", displayName, isDebug, m, e);
const respond = (s, m, d, r, c) => validRespond_cntrl(s, m, d, r, c, DEBUG_LOG);

const user_cntrl_authCheck = async (req, res) => {
  DEBUG_LOG(debug_msg.start);
  try {
    const data = { user: req.user };

    return respond(true, "Authentication successful", data, res);
  } catch (error) {
    DEBUG_LOG(debug_msg.error_E, error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", data: null });
  } finally {
    DEBUG_LOG(debug_msg.end);
  }
};

export default user_cntrl_authCheck;
