import express from "express";
import {
  getTask,
  createTask,
  deleteTask,
  editTask,
} from "../controllers/task.controller";
import protectRoute from "../middlewares/protectRoute";

const router = express.Router();

router.get("/getTask", protectRoute, getTask);
router.post("/createTask", protectRoute, createTask);
router.delete("/deleteTask", protectRoute, deleteTask);
router.put("/editTask", protectRoute, editTask);

export default router;
