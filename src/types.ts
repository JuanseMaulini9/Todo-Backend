import { Types } from "mongoose";

export interface UserInterface {
  _id: Types.ObjectId;
  username: string;
  password: string;
}

export interface TodoInterface {
  title: string;
  content?: string;
  expires?: Date;
  value?: string;
  userId: Types.ObjectId;
}

export interface TokenPayload {
  userId: string;
}
