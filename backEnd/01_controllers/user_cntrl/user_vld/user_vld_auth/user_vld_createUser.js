import {
  consoleLog,
  debug_msg,
  failed_vld,
} from "../../../../06_helpers/_helpers.index.js";

const displayName = "user_vld_createUser.js";
const isDebug = true;
const DEBUG_LOG = (m, e) => consoleLog("vld", displayName, isDebug, m, e);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_TARGET_ROLES = ["admin", "user"];

const user_vld_createUser = async (req) => {
  try {
    DEBUG_LOG(debug_msg.start);
    const sanitizedData = {};
    const data = req.body.payload;

    if (!data) {
      return failed_vld(displayName, isDebug, "Payload is required");
    }

    const { assignedEmail, targetRole } = data;

    // -- assignedEmail
    if (!assignedEmail || typeof assignedEmail !== "string") {
      return failed_vld(displayName, isDebug, req.t("validation.required_field", { field: "assignedEmail" }));
    }
    const trimmedEmail = assignedEmail.trim().toLowerCase();
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return failed_vld(displayName, isDebug, req.t("validation.invalid_email"));
    }
    sanitizedData.assignedEmail = trimmedEmail;

    // -- targetRole
    if (!targetRole || !VALID_TARGET_ROLES.includes(targetRole)) {
      return failed_vld(displayName, isDebug, req.t("validation.invalid_role"));
    }
    sanitizedData.targetRole = targetRole;

    return { isValid: true, data: sanitizedData };
  } catch (error) {
    DEBUG_LOG(debug_msg.error_E, error);
    return { isValid: false, validatorMessage: "Validation error" };
  } finally {
    DEBUG_LOG(debug_msg.end);
  }
};

export { user_vld_createUser };
