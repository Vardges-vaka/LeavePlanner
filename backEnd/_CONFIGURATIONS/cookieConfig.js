// Remember Me ON → persistent JWT cookie (100 days)
const REMEMBER_ME_TOKEN = process.env.REMEMBER_ME_TOKEN;
const REMEMBER_ME_COOKIE =
  parseInt(process.env.REMEMBER_ME_COOKIE, 10) || 8640000000;

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: REMEMBER_ME_COOKIE,
};
const clearCookie_options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
};

export { REMEMBER_ME_TOKEN, cookieOptions, clearCookie_options };
