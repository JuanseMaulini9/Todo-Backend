"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const board_controller_1 = require("../controllers/board.controller");
const protectRoute_1 = __importDefault(require("../middlewares/protectRoute"));
const router = express_1.default.Router();
router.get("/", protectRoute_1.default, board_controller_1.getBoards);
router.get("/boardsName", protectRoute_1.default, board_controller_1.getBoardsName);
router.get("/find/:boardId", protectRoute_1.default, board_controller_1.getBoardById);
router.post("/", protectRoute_1.default, board_controller_1.createBoard);
router.put("/:boardId", protectRoute_1.default, board_controller_1.editBoard);
router.delete("/:boardId", protectRoute_1.default, board_controller_1.deleteBoard);
exports.default = router;
