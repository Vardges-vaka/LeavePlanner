import { user_srv_signUpUser } from "../../user_srv/_user_cntrl_srv.index.js";
import {
  consoleLog,
  debug_msg,
  validRespond_cntrl,
} from "../../../../06_helpers/_helpers.index.js";
import { authSessionManager_util } from "../../../../05_utils/_utils.index.js";

const displayName = "user_cntrl_signUpUser.js";
const isDebug = true;
const service_Call = (req) => user_srv_signUpUser(isDebug, req);
const DEBUG_LOG = (m, e) => consoleLog("cntrl", displayName, isDebug, m, e);
const respond = (s, m, d, r, c) => validRespond_cntrl(s, m, d, r, c, DEBUG_LOG);

const user_cntrl_signUpUser = async (req, res) => {
  DEBUG_LOG(debug_msg.start);
  try {
    const { success, message, data, sessionPayload, rememberMe } =
      await service_Call(req);

    // Manage the Session
    if (success) {
      const config = { sessionPayload, mode: "login", rememberMe };
      const result = await authSessionManager_util(req, res, config);
      if (!result.ok) {
        return respond(false, result.reason, null, res, 500);
      }
    }

    return respond(success, message, data, res);
  } catch (error) {
    DEBUG_LOG(debug_msg.error_E, error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", data: null });
  } finally {
    DEBUG_LOG(debug_msg.end);
  }
};

export default user_cntrl_signUpUser;
