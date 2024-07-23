import { Request, Response } from "express";
import Task from "../schemas/tasks.schema";
import Board from "../schemas/board.schema";

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
    const { stateValue, boardId } = req.body;
    const newTask = new Task({
      title: "New task",
      stateValue,
      boardId,
    });

    await newTask.save();
    await Board.findByIdAndUpdate(boardId, {
      $push: { tasks: newTask._id },
    });
    return res.status(201).json({ message: `task created`, task: newTask });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(error);
      console.log("error");
    }
  }
};
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { boardId, taskId } = req.body;
    if (typeof taskId !== "string") {
      return res.status(400).send("Error type");
    }
    await Task.findOneAndDelete({ taskId });
    await Board.findByIdAndUpdate(boardId, {
      $pull: { tasks: taskId },
    });
    res.status(201).send("Delete ok");
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
    res.status(200).json({ update: updatedTask });
  } catch (error) {
    if (error instanceof Error) {
      res.send(error);
    }
  }
};
