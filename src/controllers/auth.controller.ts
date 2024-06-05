import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../schemas/user.schema";

export const singup = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (typeof username === "string" && typeof password === "string") {
      const userExist = await User.findOne({ username });

      if (userExist) {
        return res.status(400).send("el usuario ya existe");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        password: hashedPassword,
      });
      if (newUser) {
        await newUser.save();
        res.status(201).send("Usuario creado exitosamente");
      }
    } else {
      res.status(500).send("Datos invalidos");
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).send(`Ìnternal Error: ${error.message}`);
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (typeof username !== "string" && typeof password !== "string") {
      return res.status(400).send("Datos no validos");
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).send("Usuario no registrad");
    }

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res.status(400).send("Datos no validos");
    }

    return res.status(200).send(`${user?.username} logged`);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).send(`Internal Error: ${error.message}`);
    }
    return res.status(500).send(error);
  }
};
export const logout = (req: Request, res: Response) => {
  res.send("soy el logout");
};
