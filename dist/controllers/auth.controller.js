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
exports.logout = exports.login = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_schema_1 = __importDefault(require("../schemas/user.schema"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, confirmPass } = req.body;
        if (typeof username !== "string" &&
            typeof password !== "string" &&
            typeof confirmPass !== "string") {
            return res.status(400).json({ message: "Los datos no son validos" });
        }
        if (password !== confirmPass) {
            return res.status(400).json({ message: "Las contraseñas no coinciden" });
        }
        const userExist = yield user_schema_1.default.findOne({ username });
        if (userExist) {
            return res.status(400).json({ message: "el usuario ya existe" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 9);
        const newUser = new user_schema_1.default({
            username,
            password: hashedPassword,
        });
        if (newUser) {
            (0, generateToken_1.default)(newUser._id.toString(), res);
            yield newUser.save();
            return res.status(201).json({ username: newUser.username });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return res
                .status(500)
                .json({ message: `Ìnternal Error: ${error.message}` });
        }
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (typeof username !== "string" && typeof password !== "string") {
            return res.status(400).json({ message: "Datos no validos" });
        }
        const user = yield user_schema_1.default.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Usuario no registrad" });
        }
        const correctPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!correctPassword) {
            return res.status(400).json({ message: "Datos no validos" });
        }
        (0, generateToken_1.default)(user._id.toString(), res);
        return res.status(200).json({ username: user.username });
    }
    catch (error) {
        if (error instanceof Error) {
            return res
                .status(500)
                .json({ message: `Internal Error: ${error.message}` });
        }
        return res.status(500).send(error);
    }
});
exports.login = login;
const logout = (_req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json("deslogueado");
    }
    catch (error) {
        if (error instanceof Error) {
            return res
                .status(500)
                .json({ message: `Internal Error: ${error.message}` });
        }
        return res.status(500).json({ error: error });
    }
};
exports.logout = logout;
