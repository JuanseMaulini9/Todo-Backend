import express from "express";
import { singup, login, logout } from "../controllers/auth.controller";
const router = express.Router();

router.use("/singup", singup);
router.use("/login", login);
router.use("/logout", logout);

export default router;
