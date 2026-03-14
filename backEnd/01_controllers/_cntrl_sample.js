// import { XXX_srv_YYY } from "";
// import {
//   consoleLog,
//   debug_msg,
//   validRespond_cntrl,
// } from "../06_helpers/_helpers.index.js";

// const displayName = "XXX_cntrl_YYY.js";
// const isDebug = true;
// const service_Call = (req) => XXX_srv_YYY(isDebug, req);
// const DEBUG_LOG = (m, e) => consoleLog("cntrl", displayName, isDebug, m, e);

// const XXX_cntrl_YYY = async (req, res) => {
//   DEBUG_LOG(debug_msg.start);
//   try {
//     const { success, message, data } = await service_Call(req);

//     return validRespond_cntrl(success, message, data, DEBUG_LOG, res);
//   } catch (error) {
//     DEBUG_LOG(debug_msg.error_E, error);
//   } finally {
//     DEBUG_LOG(debug_msg.end);
//   }
// };

// export default XXX_cntrl_YYY;
