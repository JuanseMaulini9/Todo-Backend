"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_controller_1 = require("../controllers/task.controller");
const protectRoute_1 = __importDefault(require("../middlewares/protectRoute"));
const router = express_1.default.Router();
//tasks
router.get("/getTask", protectRoute_1.default, task_controller_1.getTask);
router.post("/createTask", protectRoute_1.default, task_controller_1.createTask);
router.delete("/deleteTask", protectRoute_1.default, task_controller_1.deleteTask);
router.put("/editTask", protectRoute_1.default, task_controller_1.editTask);
//checkboxs
router.post("/addChecked", protectRoute_1.default, task_controller_1.addChecked);
router.put("/editedChecked", protectRoute_1.default, task_controller_1.editedChecked);
exports.default = router;
