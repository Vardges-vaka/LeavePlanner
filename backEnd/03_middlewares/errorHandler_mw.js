export const globalErrorHandler = (err, req, res, next) => {
  consoleLog("mw", "globalErrorHandler", true, "error_E", err);
  res.status(err.status || 500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
    data: null,
  });
};
