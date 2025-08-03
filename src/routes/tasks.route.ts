import { Router } from "express";
import {
  createTasks,
  deleteTask,
  getTasks,
  getTask,
  updateTask,
  markComplete,
  getCompletedTasks,
  restore,
  getTrash,
  getSpecificUser,
  updateUser,
} from "../controllers/tasks.controllers";
import verifyUser from "../middlewares/verifyUser";
import validateTask from "../middlewares/ValidateTasks";

const router: Router = Router();
router.get("/user", verifyUser, getSpecificUser);
router.post("/", verifyUser, validateTask, createTasks);
router.get("/", verifyUser, getTasks);
router.patch("/user", verifyUser, updateUser);

router.get("/completed", verifyUser, getCompletedTasks);
router.patch("/trash/restore/:taskId", verifyUser, restore);
router.get("/trash", verifyUser, getTrash);
router.delete("/:taskId", verifyUser, deleteTask);
router.get("/:taskId", verifyUser, getTask);

router.patch("/:taskId", verifyUser, updateTask);
router.patch("/markComplete/:taskId", verifyUser, markComplete);

export default router;
