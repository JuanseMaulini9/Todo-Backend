import { TodoInterface } from "../types";
import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
  },
  expires: {
    type: Date,
  },
  value: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Todo = mongoose.model<TodoInterface>("Todo", TodoSchema);
export default Todo;
