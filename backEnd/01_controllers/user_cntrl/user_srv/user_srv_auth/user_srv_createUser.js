import Access from "../../../../00_models/Access.js";
import {
  generateAccessCode,
  hashPassword,
} from "../../../../04_services/_services.index.js";
import {
  consoleLog,
  debug_msg,
} from "../../../../06_helpers/_helpers.index.js";

const displayName = "user_srv_createUser.js";

const DEBUG = (m, e, isDebug) => consoleLog("srv", displayName, isDebug, m, e);

// Maps the caller's role to the target roles they are allowed to create
const ALLOWED_TARGETS = {
  super_admin: ["admin"],
  admin: ["user"],
};

const user_srv_createUser = async (isDebug, req) => {
  const DEBUG_LOG = (m, e) => DEBUG(m, e, isDebug);
  DEBUG_LOG(debug_msg.start);
  try {
    const { assignedEmail, targetRole } = req.body.middlewareData;
    const callerRole = req.user.role;

    // Verify the caller is allowed to create this target role
    const allowed = ALLOWED_TARGETS[callerRole];
    if (!allowed || !allowed.includes(targetRole)) {
      return { success: false, message: req.t("auth.forbidden"), data: null };
    }

    // Generate a random access code, hash it
    const plainCode = generateAccessCode();
    const hashedCode = await hashPassword(plainCode);

    // Store { hash, assignedEmail } in the appropriate newCodes list
    const accessDoc = await Access.findOne();
    if (!accessDoc) {
      return { success: false, message: "Access document not found", data: null };
    }

    accessDoc.newCodes[targetRole].push({
      hash: hashedCode,
      assignedEmail,
    });
    await accessDoc.save();

    return {
      success: true,
      message: req.t("auth.code_generated"),
      data: { accessCode: plainCode, assignedEmail, targetRole },
    };
  } catch (error) {
    DEBUG_LOG(debug_msg.error_E, error);
    return { success: false, message: error.message, data: null };
  } finally {
    DEBUG_LOG(debug_msg.end);
  }
};

export { user_srv_createUser };
