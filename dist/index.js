"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const board_routes_1 = __importDefault(require("./routes/board.routes"));
const task_routes_1 = __importDefault(require("./routes/task.routes"));
const connectMongo_1 = __importDefault(require("./db/connectMongo"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const CLIENTE = process.env.CLIENTE;
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: CLIENTE === null || CLIENTE === void 0 ? void 0 : CLIENTE.toString(),
    credentials: true,
}));
const PORT = process.env.PORT || 8080;
app.use(express_1.default.json());
app.use("/api/auth", auth_routes_1.default);
app.use("/api/board", board_routes_1.default);
app.use("/api/task", task_routes_1.default);
app.listen(PORT, () => {
    (0, connectMongo_1.default)();
    console.log(`Server running on port http://localhost:${PORT}/`);
});
