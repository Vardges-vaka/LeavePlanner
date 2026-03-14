const cacheControl = (req, res, next) => {
  // Default: prevent caching
  res.setHeader("Cache-Control", "no-store");

  const path = req.path;

  // Static assets caching
  if (path.startsWith("/static/")) {
    // Cache static assets for 7 days (604800 seconds)
    res.setHeader("Cache-Control", "public, max-age=604800, immutable");
  }

  // Authentication and profile routes
  else if (path.startsWith("/auth/") || path.startsWith("/profile/")) {
    // Prevent caching for authentication, profile, and API routes
    res.setHeader(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate",
    );
  }

  // Other routes can have default caching behavior or be customized as needed

  next();
};

export { cacheControl };
