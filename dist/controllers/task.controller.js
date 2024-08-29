"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editedChecked = exports.addChecked = exports.editTask = exports.deleteTask = exports.createTask = exports.getTask = void 0;
const tasks_schema_1 = __importDefault(require("../schemas/tasks.schema"));
const board_schema_1 = __importDefault(require("../schemas/board.schema"));
const tasks_schema_2 = __importDefault(require("../schemas/tasks.schema"));
const mongoose_1 = __importDefault(require("mongoose"));
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.body;
        const task = yield tasks_schema_1.default.findById(taskId);
        res.status(200).json({ message: "Encontrado", task });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
});
exports.getTask = getTask;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { stateValue, boardId } = req.body;
        const newTask = new tasks_schema_1.default({
            title: "New task",
            stateValue,
            boardId,
        });
        yield newTask.save();
        yield board_schema_1.default.findByIdAndUpdate(boardId, {
            $push: { tasks: newTask._id },
        });
        return res.status(201).json({ message: `task created`, task: newTask });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json(error);
            console.log("error");
        }
    }
});
exports.createTask = createTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { boardId, taskId } = req.body;
        if (typeof taskId !== "string") {
            return res.status(400).send("Error type");
        }
        yield tasks_schema_1.default.findOneAndDelete({ taskId });
        yield board_schema_1.default.findByIdAndUpdate(boardId, {
            $pull: { tasks: taskId },
        });
        res.status(201).send("Delete ok");
    }
    catch (error) {
        if (error instanceof Error) {
            res.send(error);
        }
    }
});
exports.deleteTask = deleteTask;
const editTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, expires, stateValue, taskList, _id } = req.body;
        const updatedTask = yield tasks_schema_1.default.findByIdAndUpdate(_id, {
            title,
            description,
            expires,
            stateValue,
            taskList,
        }, { new: true });
        res.status(200).json({ update: updatedTask });
    }
    catch (error) {
        if (error instanceof Error) {
            res.send(error);
        }
    }
});
exports.editTask = editTask;
const addChecked = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, name } = req.body;
        const task = yield tasks_schema_2.default.findById(_id);
        if (task) {
            const newChecked = {
                name: name,
                value: false,
                _id: new mongoose_1.default.Types.ObjectId(),
            };
            task.taskList.push(newChecked);
            yield task.save();
            res.status(200).json({ addChecked: task });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.send(error);
        }
    }
});
exports.addChecked = addChecked;
const editedChecked = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId, checkedId } = req.body;
        const task = yield tasks_schema_2.default.findById(taskId);
        if (task) {
            const checkedIndex = task.taskList.findIndex((taskItem) => taskItem._id.equals(checkedId));
            if (checkedIndex !== -1) {
                task.taskList[checkedIndex].value = !task.taskList[checkedIndex].value;
                yield task.save();
                return res.status(200).json({ editedChecked: task });
            }
            else {
                return res.status(404).json({ message: "Checked item not found" });
            }
        }
        else {
            return res.status(404).json({ message: "Task not found" });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: error.message });
        }
        else {
            res.status(500).send({ error: "Unknown error occurred" });
        }
    }
});
exports.editedChecked = editedChecked;
