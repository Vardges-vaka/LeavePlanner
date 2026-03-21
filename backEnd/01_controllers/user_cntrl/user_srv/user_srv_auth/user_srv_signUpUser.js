import { Access, User } from "../../../../00_models/_models.index.js";
import { hashPassword } from "../../../../04_services/_services.index.js";
import {
  consoleLog,
  debug_msg,
} from "../../../../06_helpers/_helpers.index.js";
import {
  matchAccessCode,
  ROLE_MAP,
} from "../../user_helpers/_user_cntrl_helpers.index.js";

const displayName = "user_srv_signUpUser.js";

const user_srv_signUpUser = async (isDebug, req) => {
  const DEBUG_LOG = (m, e) => consoleLog("srv", displayName, isDebug, m, e);
  DEBUG_LOG(debug_msg.start);

  try {
    const {
      accessCode,
      email,
      password,
      firstName,
      lastName,
      dob,
      rememberMe,
    } = req.body.middlewareData;

    // 1. Check if email is already registered
    const existingUser = await User.findOne({ "contactDetails.email": email });
    if (existingUser) {
      return { success: false, message: req.t("auth.email_taken"), data: null };
    }

    // 2. Get the singleton Access document
    const accessDoc = await Access.findOne();
    if (!accessDoc) {
      return {
        success: false,
        message: req.t("auth.invalid_access_code"),
        data: null,
      };
    }

    // 3. Match access code against all role lists
    const match = await matchAccessCode(accessDoc.newCodes, accessCode, email);
    if (!match.matched) {
      return {
        success: false,
        message: req.t("auth.invalid_access_code"),
        data: null,
      };
    }

    const { role, accessLevel } = ROLE_MAP[match.roleKey];

    // 4. Hash password and create user
    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      firstName,
      lastName,
      dob,
      contactDetails: { email },
      password: hashedPassword,
      role,
      accessLevel,
    });

    const usedCodeEntry = {
      code:
        match.roleKey === "superAdmin"
          ? accessDoc.newCodes.superAdmin[match.matchIndex]
          : accessDoc.newCodes[match.roleKey][match.matchIndex].hash,
      role,
      usedAt: new Date(),
      usedIP: req.ip,
      userId: newUser._id,
      userAgent: req.get("User-Agent") || "unknown",
      accountEmail: email,
      accountName: `${firstName} ${lastName}`,
    };

    // Remove the code from the appropriate list
    if (match.roleKey === "superAdmin") {
      accessDoc.newCodes.superAdmin.splice(match.matchIndex, 1);
    } else {
      accessDoc.newCodes[match.roleKey].splice(match.matchIndex, 1);
    }

    accessDoc.usedCodes.push(usedCodeEntry);
    await accessDoc.save();

    // Strip password from the response
    const userResponse = newUser.toObject();
    delete userResponse.password;

    const sessionPayload = { id: newUser._id, role, accessLevel };

    return {
      success: true,
      message: req.t("auth.signUp_success"),
      data: { user: userResponse },
      sessionPayload: sessionPayload,
      rememberMe: rememberMe,
    };
  } catch (error) {
    DEBUG_LOG(debug_msg.error_E, error);
    return { success: false, message: "error.message", data: null }; // TODO: translate
  } finally {
    DEBUG_LOG(debug_msg.end);
  }
};

export { user_srv_signUpUser };
