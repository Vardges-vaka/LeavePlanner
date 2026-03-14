import User from "../00_models/User.js";
import Access from "../00_models/Access.js";
import { verifyJWT } from "../04_services/_services.index.js";

export const auth_mw = async (req, res, next) => {
  try {
    let userId = null;

    // Strategy 1: JWT cookie (rememberMe users)
    const token =
      req.cookies?.token ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (token) {
      const decoded = verifyJWT(token);
      if (!decoded) {
        return res.status(401).json({
          success: false,
          message: req.t("auth.token_invalid"),
          data: null,
        });
      }

      // Check if token is blacklisted
      const blacklisted = await Access.findOne({
        "blacklist.tokens.logOut": token,
      });
      if (blacklisted) {
        return res.status(401).json({
          success: false,
          message: req.t("auth.token_blacklisted"),
          data: null,
        });
      }

      userId = decoded.id;
    }

    // Strategy 2: Session fallback (non-rememberMe users)
    if (!userId && req.session?.user) {
      userId = req.session.user.id;
    }

    // No auth at all
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: req.t("auth.token_missing"),
        data: null,
      });
    }

    // Find user and attach to request
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: req.t("auth.user_not_found"),
        data: null,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};
