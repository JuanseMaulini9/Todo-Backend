import jwt from "jsonwebtoken";
import User from "../schemas/user.schema";
import { TokenPayload } from "../types";
import { Request, Response, NextFunction } from "express";

const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).send("No hay token");
    }

    if (typeof process.env.JWT_SECRET !== "string") {
      return res.status(500).send("internal error");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as TokenPayload;
    if (!decoded) {
      return res.status(401).send("deco failed");
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).send("usuario no encontrado");
    }
    req.user = user;

    next();
  } catch (error) {
    if (error instanceof Error) {
      res.send(error);
    }
  }
};

export default protectRoute;
