import { Router } from "express";
import {
  auth_mw,
  role_mw,
  dataVld_mw,
  authLimiter,
} from "../03_middlewares/_middlewares.index.js";
import {
  // Controllers
  user_cntrl_createUser,
  user_cntrl_logInUser,
  user_cntrl_logOutUser,
  user_cntrl_signUpUser,
  user_cntrl_authCheck,

  // Validators
  user_vld_createUser,
  user_vld_logInUser,
  user_vld_signUpUser,
} from "../01_controllers/_cntrl.index.js";

const router = Router();

// Public routes (rate-limited to prevent brute force)
router.post(
  "/signup",
  authLimiter,
  dataVld_mw(user_vld_signUpUser),
  user_cntrl_signUpUser,
);

router.post(
  "/login",
  authLimiter,
  dataVld_mw(user_vld_logInUser),
  user_cntrl_logInUser,
);

// Returns the current authenticated user (JWT cookie or session)
router.get("/me", auth_mw, user_cntrl_authCheck);

// Protected routes
router.post("/logout", auth_mw, user_cntrl_logOutUser);

router.post(
  "/create",
  auth_mw,
  role_mw("super_admin", "admin"),
  dataVld_mw(user_vld_createUser),
  user_cntrl_createUser,
);

export default router;
