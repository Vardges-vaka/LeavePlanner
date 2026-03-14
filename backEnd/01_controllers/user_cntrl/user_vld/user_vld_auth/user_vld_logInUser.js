import {
  consoleLog,
  debug_msg,
  failed_vld,
} from "../../../../06_helpers/_helpers.index.js";

const displayName = "user_vld_logInUser.js";
const isDebug = true;
const DEBUG_LOG = (m, e) => consoleLog("vld", displayName, isDebug, m, e);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const user_vld_logInUser = async (req) => {
  try {
    DEBUG_LOG(debug_msg.start);
    const sanitizedData = {};
    const data = req.body.payload;

    if (!data) {
      return failed_vld(displayName, isDebug, "Payload is required");
    }

    const { email, password, rememberMe } = data;

    // -- email
    if (!email || typeof email !== "string") {
      return failed_vld(displayName, isDebug, req.t("validation.required_field", { field: "email" }));
    }
    const trimmedEmail = email.trim().toLowerCase();
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return failed_vld(displayName, isDebug, req.t("validation.invalid_email"));
    }
    sanitizedData.email = trimmedEmail;

    // -- password
    if (!password || typeof password !== "string") {
      return failed_vld(displayName, isDebug, req.t("validation.required_field", { field: "password" }));
    }
    sanitizedData.password = password;

    // -- rememberMe
    sanitizedData.rememberMe = rememberMe === true;

    sanitizedData.isValid = true;
    return { isValid: true, data: sanitizedData };
  } catch (error) {
    DEBUG_LOG(debug_msg.error_E, error);
    return { isValid: false, validatorMessage: "Validation error" };
  } finally {
    DEBUG_LOG(debug_msg.end);
  }
};

export { user_vld_logInUser };
