import express, { Request, Response } from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import connectToMongo from "./db/connectMongo";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("PROBANDO actualizacion");
});

app.listen(PORT, () => {
  connectToMongo();
  console.log(`Server running on port http://localhost:${PORT}/`);
});
