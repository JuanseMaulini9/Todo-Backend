import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../schemas/user.schema";

export const singup = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (typeof username === "string" && typeof password === "string") {
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
};

export const login = (req: Request, res: Response) => {
  res.send("soy el login");
};
export const logout = (req: Request, res: Response) => {
  res.send("soy el logout");
};
