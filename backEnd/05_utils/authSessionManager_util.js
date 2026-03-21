import { Access } from "../00_models/_models.index.js";
import { generateJWT } from "../04_services/_services.index.js";
import {
  REMEMBER_ME_TOKEN,
  cookieOptions,
  clearCookie_options,
} from "../_CONFIGURATIONS/_config.index.js";

const destroySessionPromise = (req) => {
  return new Promise((resolve, reject) => {
    if (!req?.session) return resolve();

    req.session.destroy((err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

const blacklistToken = async (token) => {
  if (!token) return;

  // TODO: store token in DB (prefer hashing + expiry later)
  // Example placeholder:
  await Access.findOneAndUpdate(
    {},
    { $push: { "blacklist.tokens.logOut": token } },
    { upsert: false },
  );
};
const logoutSessionManager = async (req, res) => {
  try {
    // 1) Grab token BEFORE clearing cookie
    const token = req.cookies?.token;

    // 2) Clear auth cookies
    res.clearCookie("token", clearCookie_options);
    res.clearCookie("connect.sid", clearCookie_options);

    // 3) Destroy server session (best-effort server-side logout)
    try {
      await destroySessionPromise(req);
    } catch (err) {
      return err?.message || "Failed to destroy session";
    }

    // 4) Blacklist token (optional; best-effort)
    try {
      await blacklistToken(token);
    } catch (err) {
      return err?.message || "Failed to blacklist token";
    }

    return true;
  } catch (err) {
    return err?.message || "Logout failed";
  }
};

const loginSessionManager = async (req, res, sessionPayload, rememberMe) => {
  req.session.user = sessionPayload;

  if (!req.session.user) {
    return "Session not created";
  }

  if (rememberMe) {
    const token = generateJWT(sessionPayload, REMEMBER_ME_TOKEN);
    if (!token) {
      return "Token not generated";
    }
    res.cookie("token", token, cookieOptions);
  }

  return true;
};

const authSessionManager_util = async (req, res, config) => {
  let ok = false;
  let reason = null;
  if (!req || !res || !config) {
    reason = "Invalid Parameters";
    return { ok, reason };
  }
  if (!["login", "logout"].includes(config.mode)) {
    reason = "Invalid Mode";
    return { ok, reason };
  }

  const { sessionPayload, mode, rememberMe } = config;

  if (mode === "login") {
    if (rememberMe === undefined) {
      reason = "Remember Me is required";
      return { ok, reason };
    }
    if (
      !sessionPayload ||
      !sessionPayload.id ||
      !sessionPayload.role ||
      !sessionPayload.accessLevel
    ) {
      reason = "Invalid Session Payload";
      return { ok, reason };
    }
  }

  switch (mode) {
    case "login":
      const loginResult = await loginSessionManager(
        req,
        res,
        sessionPayload,
        rememberMe,
      );
      if (typeof loginResult === "string") {
        reason = loginResult;
        ok = false;
      } else {
        ok = true;
      }
      break;
    case "logout":
      const logoutResult = await logoutSessionManager(req, res);
      if (typeof logoutResult === "string") {
        reason = logoutResult;
        ok = false;
      } else {
        ok = true;
      }
      break;
  }

  return { ok, reason };
};

export { authSessionManager_util };

/*
! Old code for reference
const logoutSessionManager = async (req, res) => {
  // ? Blacklist the JWT cookie if it exists (rememberMe users)
  try {
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

    // ? Destroy server-side session data AND clear the session cookie

    if (req.session) {
      try {
        await new Promise((resolve, reject) => {
          req.session.destroy((err) => {
            if (err) return reject(err);
            resolve();
          });
        });
      } catch (error) {
        return error.message;
      }
    }

    res.clearCookie("connect.sid", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    return true;
  } catch (error) {
    return error.message;
  }
};

*/
