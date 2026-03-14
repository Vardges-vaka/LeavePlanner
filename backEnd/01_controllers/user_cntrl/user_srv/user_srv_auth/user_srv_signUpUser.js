import bcrypt from "bcryptjs";
import User from "../../../../00_models/User.js";
import Access from "../../../../00_models/Access.js";
import {
  hashPassword,
  generateJWT,
} from "../../../../04_services/_services.index.js";
import {
  consoleLog,
  debug_msg,
} from "../../../../06_helpers/_helpers.index.js";

const displayName = "user_srv_signUpUser.js";
const REMEMBER_ME_MAX_AGE = 100 * 24 * 60 * 60 * 1000; // 100 days in ms

const ROLE_MAP = {
  superAdmin: { role: "super_admin", accessLevel: "high" },
  admin: { role: "admin", accessLevel: "medium" },
  user: { role: "user", accessLevel: "low" },
};

const DEBUG = (m, e, isDebug) =>
  consoleLog("srv", displayName, isDebug, m, e);

/**
 * Tries to match `plainCode` against each role's code list in the Access doc.
 * SuperAdmin: hash-only comparison.
 * Admin/User: hash + assignedEmail comparison.
 * Returns { matched, roleKey, matchIndex } or { matched: false }.
 */
const matchAccessCode = async (accessDoc, plainCode, email) => {
  // 1. Check superAdmin codes (no email binding)
  for (let i = 0; i < accessDoc.newCodes.superAdmin.length; i++) {
    const isMatch = await bcrypt.compare(plainCode, accessDoc.newCodes.superAdmin[i]);
    if (isMatch) return { matched: true, roleKey: "superAdmin", matchIndex: i };
  }

  // 2. Check admin codes (email-bound)
  for (let i = 0; i < accessDoc.newCodes.admin.length; i++) {
    const entry = accessDoc.newCodes.admin[i];
    if (entry.assignedEmail !== email) continue;
    const isMatch = await bcrypt.compare(plainCode, entry.hash);
    if (isMatch) return { matched: true, roleKey: "admin", matchIndex: i };
  }

  // 3. Check user codes (email-bound)
  for (let i = 0; i < accessDoc.newCodes.user.length; i++) {
    const entry = accessDoc.newCodes.user[i];
    if (entry.assignedEmail !== email) continue;
    const isMatch = await bcrypt.compare(plainCode, entry.hash);
    if (isMatch) return { matched: true, roleKey: "user", matchIndex: i };
  }

  return { matched: false };
};

const user_srv_signUpUser = async (isDebug, req, res) => {
  const DEBUG_LOG = (m, e) => DEBUG(m, e, isDebug);
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
      return { success: false, message: req.t("auth.invalid_access_code"), data: null };
    }

    // 3. Match access code against all role lists
    const match = await matchAccessCode(accessDoc, accessCode, email);
    if (!match.matched) {
      return { success: false, message: req.t("auth.invalid_access_code"), data: null };
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

    // 5. Move the used code from newCodes to usedCodes
    const usedCodeEntry = {
      code: match.roleKey === "superAdmin"
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
      message: req.t("auth.signUp_success"),
      data: { user: userResponse },
    };
  } catch (error) {
    DEBUG_LOG(debug_msg.error_E, error);
    return { success: false, message: error.message, data: null };
  } finally {
    DEBUG_LOG(debug_msg.end);
  }
};

export { user_srv_signUpUser };
