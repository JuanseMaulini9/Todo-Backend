import { Request, Response } from "express";
import Todo from "../schemas/todo.schema";

export const getTodo = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const allTodoUser = await Todo.find({ userId }).populate(
      "userId",
      "_id username"
    );
    res.send(allTodoUser);
  } catch (error) {
    if (error instanceof Error) {
      res.send(error);
    }
  }
};
export const createTodo = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const { title, content, expires, value } = req.body;
    const newTodo = new Todo({
      title,
      content,
      expires,
      value,
      userId,
    });
    await newTodo.save();

    res.status(201).send("created");
  } catch (error) {
    if (error instanceof Error) {
      res.send(error);
    }
  }
};
export const deleteTodo = (req: Request, res: Response) => {};
export const editTodo = (req: Request, res: Response) => {};
