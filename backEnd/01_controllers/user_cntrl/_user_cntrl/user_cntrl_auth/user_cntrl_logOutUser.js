import { user_srv_logOutUser } from "../../user_srv/_user_cntrl_srv.index.js";
import {
  consoleLog,
  debug_msg,
  validRespond_cntrl,
} from "../../../../06_helpers/_helpers.index.js";

const displayName = "user_cntrl_logOutUser.js";
const isDebug = true;
const service_Call = (req, res) => user_srv_logOutUser(isDebug, req, res);
const DEBUG_LOG = (m, e) => consoleLog("cntrl", displayName, isDebug, m, e);

const user_cntrl_logOutUser = async (req, res) => {
  DEBUG_LOG(debug_msg.start);
  try {
    const { success, message, data } = await service_Call(req, res);

    return validRespond_cntrl(success, message, data, DEBUG_LOG, res);
  } catch (error) {
    DEBUG_LOG(debug_msg.error_E, error);
  } finally {
    DEBUG_LOG(debug_msg.end);
  }
};

export default user_cntrl_logOutUser;
