"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const mongoose_1 = __importStar(require("mongoose"));
const TaskCheckedSchema = new mongoose_1.default.Schema({
    value: {
        type: Boolean,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});
const TasksSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    expires: {
        type: Date,
        default: new Date(),
    },
    taskList: {
        type: [TaskCheckedSchema],
    },
    stateValue: {
        type: String,
        enum: Object.values(types_1.StateValue),
        default: "To do",
    },
    boardId: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: "Board",
    },
});
const Tasks = mongoose_1.default.model("Tasks", TasksSchema);
exports.default = Tasks;
