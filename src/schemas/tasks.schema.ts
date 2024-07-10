import { TasksInterface, TaskChecked, StateValue } from "../types";
import mongoose from "mongoose";

const TaskCheckedSchema = new mongoose.Schema<TaskChecked>({
  value: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const TasksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  expires: {
    type: Date,
  },
  taskList: {
    type: [TaskCheckedSchema],
  },
  stateValue: {
    type: String,
    enum: Object.values(StateValue),
    default: "To do",
  },
});

const Tasks = mongoose.model<TasksInterface>("Tasks", TasksSchema);
export default Tasks;
