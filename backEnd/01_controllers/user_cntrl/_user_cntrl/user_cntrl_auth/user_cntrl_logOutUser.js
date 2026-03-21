import {
  consoleLog,
  debug_msg,
  validRespond_cntrl,
} from "../../../../06_helpers/_helpers.index.js";
import { authSessionManager_util } from "../../../../05_utils/_utils.index.js";

const displayName = "user_cntrl_logOutUser.js";
const isDebug = true;
const DEBUG_LOG = (m, e) => consoleLog("cntrl", displayName, isDebug, m, e);
const respond = (s, m, d, r, c) => validRespond_cntrl(s, m, d, r, c, DEBUG_LOG);

const user_cntrl_logOutUser = async (req, res) => {
  DEBUG_LOG(debug_msg.start);
  try {
    const config = { mode: "logout" };
    const result = await authSessionManager_util(req, res, config);
    if (!result.ok) {
      return respond(false, result.reason, null, res, 500);
    }
    const message = req.t("auth.logOut_success");
    return respond(true, message, null, res);
  } catch (error) {
    DEBUG_LOG(debug_msg.error_E, error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", data: null });
  } finally {
    DEBUG_LOG(debug_msg.end);
  }
};

export default user_cntrl_logOutUser;
