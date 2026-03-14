import { Router } from "express";
import { auth_mw, dataVld_mw } from "../03_middlewares/_middlewares.index.js";
import {
  // ! Controllers
  user_cntrl_createUser,
  //   user_cntrl_loglnUser,
  //   user_cntrl_logOutUser,
  //   user_cntrl_signUpUser,

  // ! Validators
  user_vld_createUser,
  //   user_vld_loglnUser,
  //   user_vld_logOutUser,
  //   user_vld_signUpUser,
} from "../01_controllers/_cntrl.index.js";

const router = Router();

// Create User
router.get(
  "/create",
  auth_mw,
  dataVld_mw(user_vld_createUser),
  user_cntrl_createUser,
);

export default router;
