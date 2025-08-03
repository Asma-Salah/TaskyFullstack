import { Router } from "express";
import verifyUserInformation from "../middlewares/verifyUserInformation";
import checkUsernameAndEmailReuse from "../middlewares/checkUsernameAndEmailReuse";
import passwordStrength from "../middlewares/passwordStrength";
import {
  registerUser,
  loginUser,
  updatedPassword,
  logout,
} from "../controllers/auth.controller";
import verifyLogInUser from "../middlewares/verifyLoginUser";
import verifyUser from "../middlewares/verifyUser";

const router: Router = Router();

router.post(
  "/auth/register",
  verifyUserInformation,
  checkUsernameAndEmailReuse,
  passwordStrength,
  registerUser
);
router.post("/auth/login", verifyLogInUser, loginUser);
router.patch("/auth/password", verifyUser, updatedPassword);
router.post("/auth/logout", verifyUser, logout);

export default router;
