import { Types } from "mongoose";

export interface UserInterface {
  _id: Types.ObjectId;
  username: string;
  password: string;
  boards: [Types.ObjectId];
}

export interface BoardInterface {
  _id: Types.ObjectId;
  nameBoard: string;
  user: Types.ObjectId;
  tasks: [Types.ObjectId];
}

export enum StateValue {
  todo = "To do",
  inprogress = "In progress",
  done = "Done",
}

export interface TaskChecked {
  value: boolean;
  name: string;
}

export interface TasksInterface {
  _id: Types.ObjectId;
  title: string;
  description: string;
  expires: Date;
  taskList: TaskChecked[];
  stateValue: StateValue;
}

export interface TokenPayload {
  userId: string;
}
