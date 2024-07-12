import { Request, Response } from "express";
import Task from "../schemas/tasks.schema";

export const getTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.body;
    const task = await Task.findById(taskId);
    res.status(200).json({ message: "Encontrado", task });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};
export const createTask = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const { title, description, expires, stateValue, taskList } = req.body;
    const newTask = new Task({
      title,
      description,
      expires,
      stateValue,
      taskList,
    });

    const taskSaved = await newTask.save();
    if (taskSaved)
      return res.status(201).json({ message: `task ${title} created` });
    else throw new Error();
  } catch (error) {
    if (error instanceof Error) {
      res.send(error);
    }
  }
};
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body;
    if (typeof _id !== "string") {
      return res.status(400).send("Error type");
    }
    await Task.findOneAndDelete({ _id });
    res.status(201).send("Task ok");
  } catch (error) {
    if (error instanceof Error) {
      res.send(error);
    }
  }
};
export const editTask = async (req: Request, res: Response) => {
  try {
    const { title, description, expires, stateValue, taskList, _id } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      _id,
      {
        title,
        description,
        expires,
        stateValue,
        taskList,
      },
      { new: true }
    );
    res.status(200).json({ message: `Task actualizada: ${updatedTask}` });
  } catch (error) {
    if (error instanceof Error) {
      res.send(error);
    }
  }
};
