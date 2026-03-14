/**
 * Higher-order middleware that restricts access to the listed roles.
 * Usage: role_mw("super_admin", "admin")
 */
const role_mw =
  (...allowedRoles) =>
  (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: req.t("auth.forbidden"),
        data: null,
      });
    }
    next();
  };

export { role_mw };
