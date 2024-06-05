import { UserInterface } from "../types";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const User = mongoose.model<UserInterface>("User", userSchema);
export default User;
