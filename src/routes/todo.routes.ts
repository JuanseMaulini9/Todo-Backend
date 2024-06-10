import express from "express";
import {
  getTodo,
  createTodo,
  deleteTodo,
  editTodo,
} from "../controllers/todo.controller";
import protectRoute from "../middlewares/protectRoute";

const router = express.Router();

router.get("/getTodo", protectRoute, getTodo);
router.post("/createTodo", protectRoute, createTodo);
router.delete("/deleteTodo", protectRoute, deleteTodo);
router.put("/editTodo", protectRoute, editTodo);

export default router;
