import { User } from "../../../../00_models/_models.index.js";
import { comparePassword } from "../../../../04_services/_services.index.js";
import {
  consoleLog,
  debug_msg,
} from "../../../../06_helpers/_helpers.index.js";

const displayName = "user_srv_logInUser.js";

const user_srv_logInUser = async (isDebug, req, res) => {
  const DEBUG_LOG = (m, e) => consoleLog("srv", displayName, isDebug, m, e);

  DEBUG_LOG(debug_msg.start);
  try {
    const { email, password, rememberMe } = req.body.middlewareData;

    // 1. Find user by email
    const user = await User.findOne({ "contactDetails.email": email });
    if (!user) {
      return {
        success: false,
        message: req.t("auth.invalid_credentials"),
        data: null,
      };
    }

    // 2. Compare password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return {
        success: false,
        message: req.t("auth.invalid_credentials"),
        data: null,
      };
    }

    // Strip password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    const sessionPayload = {
      id: user._id,
      role: user.role,
      accessLevel: user.accessLevel,
    };

    return {
      success: true,
      message: req.t("auth.logIn_success"),
      data: { user: userResponse },
      sessionPayload: sessionPayload,
      rememberMe: rememberMe,
    };
  } catch (error) {
    DEBUG_LOG(debug_msg.error_E, error);
    return { success: false, message: error.message, data: null };
  } finally {
    DEBUG_LOG(debug_msg.end);
  }
};

export { user_srv_logInUser };
