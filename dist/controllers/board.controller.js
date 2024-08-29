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
exports.deleteBoard = exports.editBoard = exports.createBoard = exports.getBoardsName = exports.getBoardById = exports.getBoards = void 0;
const board_schema_1 = __importDefault(require("../schemas/board.schema"));
const user_schema_1 = __importDefault(require("../schemas/user.schema"));
const getBoards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userLogged = req.user;
    if (!userLogged) {
        return res.status(401).json({ message: "No hay usuario loggeado" });
    }
    try {
        const userBoards = yield board_schema_1.default.find({ user: userLogged._id })
            .populate("user", "username")
            .populate("tasks");
        if (userBoards) {
            return res.status(200).json({ userBoards });
        }
        else
            return res.status(404).json({ message: "No se encontraron tableros" });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: "error" });
        }
    }
});
exports.getBoards = getBoards;
const getBoardById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { boardId } = req.params;
    try {
        const board = yield board_schema_1.default.findById(boardId)
            .populate("user", "username")
            .populate("tasks");
        if (board) {
            return res.status(200).json({ board });
        }
        else
            return res.status(404).json({ message: "No se encontraron tableros" });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: "error" });
        }
    }
});
exports.getBoardById = getBoardById;
const getBoardsName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userLogged = req.user;
    try {
        const boards = yield board_schema_1.default.find({ user: userLogged._id }).select("_id nameBoard");
        if (boards) {
            return res.status(200).json({ boards });
        }
        else
            throw new Error("boards no encotrados");
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: "error" });
        }
    }
});
exports.getBoardsName = getBoardsName;
const createBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userLogged = req.user;
    if (!userLogged) {
        return res.status(401).json({ message: "No hay usuario loggeado" });
    }
    try {
        const { nameBoard } = req.body;
        const newBoard = new board_schema_1.default({
            nameBoard,
            user: userLogged._id,
            tasks: [],
        });
        yield newBoard.save();
        yield user_schema_1.default.findByIdAndUpdate(userLogged._id, {
            $push: { boards: newBoard._id },
        });
        const newBoardResponse = {
            _id: newBoard._id,
            nameBoard: newBoard.nameBoard,
        };
        res.status(200).json(newBoardResponse);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error });
        }
    }
});
exports.createBoard = createBoard;
const editBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userLogged = req.user;
    if (!userLogged) {
        return res.status(401).json({ message: "No hay usuario loggeado" });
    }
    try {
        const { newBoardName } = req.body;
        const { boardId } = req.params;
        const updateBoard = yield board_schema_1.default.findByIdAndUpdate(boardId, {
            nameBoard: newBoardName,
        });
        res.status(200).json({ message: "board actualizado", updateBoard });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error });
        }
    }
});
exports.editBoard = editBoard;
const deleteBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userLogged = req.user;
    if (!userLogged) {
        return res.status(401).json({ message: "No hay usuario loggeado" });
    }
    try {
        const { boardId } = req.params;
        const boardDelete = yield board_schema_1.default.findByIdAndDelete(boardId);
        if (!boardDelete) {
            return res.status(404).json({ message: "Board no encontrado" });
        }
        yield user_schema_1.default.findByIdAndUpdate(boardDelete.user, {
            $pull: { boards: boardId },
        });
        res.status(200).json({ message: "board deleted", boardDelete });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error });
        }
    }
});
exports.deleteBoard = deleteBoard;
