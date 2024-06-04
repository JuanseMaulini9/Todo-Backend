import express, { Request, Response } from "express";

export const singup = (req: Request, res: Response) => {
  console.log("soy el singup");
};
export const login = (req: Request, res: Response) => {
  console.log("soy el login");
};
export const logout = (req: Request, res: Response) => {
  console.log("soy el register");
};
