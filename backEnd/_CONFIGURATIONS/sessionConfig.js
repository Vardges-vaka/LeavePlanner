import dotenv from "dotenv";
import session from "express-session";
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const SESSION_SECRET = process.env.SESSION_SECRET;

const GLOBAL_SESSION_EXPIRY =
  parseInt(process.env.GLOBAL_SESSION_EXPIRY, 10) || 3600000;

const session_mw = session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: isProduction, //! Important for production
    httpOnly: true,
    maxAge: GLOBAL_SESSION_EXPIRY,
    ...(isProduction && { sameSite: "none" }), //! Important for production
  },
});

export { session_mw, GLOBAL_SESSION_EXPIRY, SESSION_SECRET };
