import { Router } from "express";
import { uploadAvatar } from "../controllers/ProfileController";
import multer from "multer";
import verifyUser from "../middlewares/verifyUser";

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
});

const route = Router();
route.post("/", verifyUser, upload.single("avatar"), uploadAvatar);

export default route;
