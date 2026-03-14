import User from "../../../../00_models/User.js";
import {
  comparePassword,
  generateJWT,
} from "../../../../04_services/_services.index.js";
import {
  consoleLog,
  debug_msg,
} from "../../../../06_helpers/_helpers.index.js";

const displayName = "user_srv_logInUser.js";
const REMEMBER_ME_MAX_AGE = 100 * 24 * 60 * 60 * 1000; // 100 days

const DEBUG = (m, e, isDebug) =>
  consoleLog("srv", displayName, isDebug, m, e);

const user_srv_logInUser = async (isDebug, req, res) => {
  const DEBUG_LOG = (m, e) => DEBUG(m, e, isDebug);
  DEBUG_LOG(debug_msg.start);
  try {
    const { email, password, rememberMe } = req.body.middlewareData;

    // 1. Find user by email
    const user = await User.findOne({ "contactDetails.email": email });
    if (!user) {
      return { success: false, message: req.t("auth.invalid_credentials"), data: null };
    }

    // 2. Compare password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return { success: false, message: req.t("auth.invalid_credentials"), data: null };
    }

    // Strip password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    const sessionPayload = { id: user._id, role: user.role, accessLevel: user.accessLevel };

    if (rememberMe) {
      // Remember Me ON → persistent JWT cookie (100 days)
      const token = generateJWT(sessionPayload, "100d");
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: REMEMBER_ME_MAX_AGE,
      });
    }

    // Always store user in session (10h expiry if no cookie, default otherwise)
    req.session.user = sessionPayload;

    return {
      success: true,
      message: req.t("auth.logIn_success"),
      data: { user: userResponse },
    };
  } catch (error) {
    DEBUG_LOG(debug_msg.error_E, error);
    return { success: false, message: error.message, data: null };
  } finally {
    DEBUG_LOG(debug_msg.end);
  }
};

export { user_srv_logInUser };
