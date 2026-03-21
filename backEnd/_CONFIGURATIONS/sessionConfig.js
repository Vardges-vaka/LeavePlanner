import session from "express-session";
import MongoStore from "connect-mongo";

/**
 * Session middleware is built lazily via createSessionMW() because
 * ES module imports are hoisted — env vars aren't available at
 * import-time. server.js calls dotenv first, then this factory.
 */
const createSessionMW = () => {
  const isProduction = process.env.NODE_ENV === "production";
  const SESSION_SECRET = process.env.SESSION_SECRET;
  const MONGODB_URI = process.env.MONGODB_URI;
  const GLOBAL_SESSION_EXPIRY =
    parseInt(process.env.GLOBAL_SESSION_EXPIRY, 10) || 3600000;

  if (!SESSION_SECRET) {
    if (isProduction) {
      throw new Error("Missing SESSION_SECRET");
    }
    console.warn(
      "SESSION_SECRET is missing; using an insecure default for dev.",
    );
  }

  return {
    middleware: session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: MONGODB_URI,
        collectionName: "sessions",
        ttl: GLOBAL_SESSION_EXPIRY / 1000,
      }),
      cookie: {
        secure: isProduction,
        httpOnly: true,
        maxAge: GLOBAL_SESSION_EXPIRY,
        // ...(isProduction && { sameSite: "none" }), // ? Double check this
        sameSite: isProduction ? "none" : "lax",
      },
    }),
    GLOBAL_SESSION_EXPIRY,
    SESSION_SECRET,
  };
};

export { createSessionMW };
