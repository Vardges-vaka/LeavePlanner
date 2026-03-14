import Access from "../../../../00_models/Access.js";
import {
  consoleLog,
  debug_msg,
} from "../../../../06_helpers/_helpers.index.js";

const displayName = "user_srv_logOutUser.js";

const DEBUG = (m, e, isDebug) =>
  consoleLog("srv", displayName, isDebug, m, e);

const user_srv_logOutUser = async (isDebug, req, res) => {
  const DEBUG_LOG = (m, e) => DEBUG(m, e, isDebug);
  DEBUG_LOG(debug_msg.start);
  try {
    // Blacklist the JWT cookie if it exists (rememberMe users)
    const token = req.cookies?.token;
    if (token) {
      await Access.findOneAndUpdate(
        {},
        { $push: { "blacklist.tokens.logOut": token } },
      );

      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      });
    }

    // Grab the translated message before destroying the session
    const message = req.t("auth.logOut_success");

    // Destroy server-side session data AND clear the session cookie
    if (req.session) {
      req.session.destroy(() => {});
    }
    res.clearCookie("connect.sid", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    return {
      success: true,
      message,
      data: null,
    };
  } catch (error) {
    DEBUG_LOG(debug_msg.error_E, error);
    return { success: false, message: error.message, data: null };
  } finally {
    DEBUG_LOG(debug_msg.end);
  }
};

export { user_srv_logOutUser };
