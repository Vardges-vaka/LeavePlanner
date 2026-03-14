import {
  consoleLog,
  debug_msg,
  failed_vld,
} from "../../../../06_helpers/_helpers.index.js";

const displayName = "user_vld_signUpUser.js";
const isDebug = true;
const DEBUG_LOG = (m, e) => consoleLog("vld", displayName, isDebug, m, e);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const user_vld_signUpUser = async (req) => {
  try {
    DEBUG_LOG(debug_msg.start);
    const sanitizedData = {};
    const data = req.body.payload;

    if (!data) {
      return failed_vld(displayName, isDebug, "Payload is required");
    }

    const { accessCode, email, password, firstName, lastName, dob, rememberMe } = data;

    // -- accessCode
    if (!accessCode || typeof accessCode !== "string") {
      return failed_vld(displayName, isDebug, req.t("validation.required_field", { field: "accessCode" }));
    }
    sanitizedData.accessCode = accessCode.trim();

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
    if (password.length < 8) {
      return failed_vld(displayName, isDebug, req.t("validation.password_too_short"));
    }
    sanitizedData.password = password;

    // -- firstName
    if (!firstName || typeof firstName !== "string") {
      return failed_vld(displayName, isDebug, req.t("validation.required_field", { field: "firstName" }));
    }
    sanitizedData.firstName = firstName.trim();

    // -- lastName
    if (!lastName || typeof lastName !== "string") {
      return failed_vld(displayName, isDebug, req.t("validation.required_field", { field: "lastName" }));
    }
    sanitizedData.lastName = lastName.trim();

    // -- dob
    if (!dob) {
      return failed_vld(displayName, isDebug, req.t("validation.required_field", { field: "dob" }));
    }
    const parsedDob = new Date(dob);
    if (isNaN(parsedDob.getTime())) {
      return failed_vld(displayName, isDebug, req.t("validation.invalid_dob"));
    }
    if (parsedDob > new Date()) {
      return failed_vld(displayName, isDebug, req.t("validation.dob_future"));
    }
    sanitizedData.dob = parsedDob;

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

export { user_vld_signUpUser };
