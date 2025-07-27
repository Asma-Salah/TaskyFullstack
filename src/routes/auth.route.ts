import { Router } from "express";
import verifyUserInformation from "../middlewares/verifyUserInformation";
import checkUsernameAndEmailReuse from "../middlewares/checkUsernameAndEmailReuse";
import passwordStrength from "../middlewares/passwordStrength";
import { registerUser, loginUser } from "../controllers/auth.controller";
const router: Router = Router();

router.post(
  "/auth/register",
  verifyUserInformation,
  checkUsernameAndEmailReuse,
  passwordStrength,
  registerUser
);
router.post("/auth/login", loginUser);

export default router;
