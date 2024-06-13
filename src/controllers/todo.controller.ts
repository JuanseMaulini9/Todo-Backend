import { Request, Response, response } from "express";
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
export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body;
    if (typeof _id !== "string") {
      return res.status(400).send("Error type");
    }
    await Todo.findOneAndDelete({ _id });
    res.status(201).send("todo ok");
  } catch (error) {
    if (error instanceof Error) {
      res.send(error);
    }
  }
};
export const editTodo = async (req: Request, res: Response) => {
  try {
    const { title, content, expires, value, _id } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      _id,
      {
        title,
        content,
        expires,
        value,
      },
      { new: true }
    );
    res.status(200).send(`Todo actualizada: ${updatedTodo}`);
  } catch (error) {
    if (error instanceof Error) {
      res.send(error);
    }
  }
};
