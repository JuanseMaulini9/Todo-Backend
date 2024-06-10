import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { UserInterface } from "./types";
import authRoutes from "./routes/auth.routes";
import todoRoutes from "./routes/todo.routes";
import connectToMongo from "./db/connectMongo";
import cookieParser from "cookie-parser";

declare global {
  namespace Express {
    interface Request {
      user: UserInterface;
    }
  }
}

const app = express();

dotenv.config();
app.use(cookieParser());

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/todo", todoRoutes);

app.listen(PORT, () => {
  connectToMongo();
  console.log(`Server running on port http://localhost:${PORT}/`);
});
