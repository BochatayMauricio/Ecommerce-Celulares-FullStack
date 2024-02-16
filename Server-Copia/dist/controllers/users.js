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
exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    //Validacion de si el usuario ya existe en la bd
    const user = yield user_1.User.findOne({ where: { username: userName } });
    if (user) {
        return res.status(400).json({
            msg: `Ya existe un usuario con el nombre ${userName}`
        });
    }
    try {
        yield user_1.User.create({
            userName: userName,
            password: hashedPassword
        });
        res.json({
            msg: ` usuario ${userName} creado exitosamente`,
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un Error',
            error
        });
    }
});
exports.newUser = newUser;
// export const loginUser = (req: Request, res: Response) => {
//   const { body } = req;
//   res.json({
//     msg: 'Login User',
//     body
//   })} 
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password } = req.body;
    //Validamos si el usuario existe en la bd
    const user = yield user_1.User.findOne({ where: { username: userName } });
    if (!user) {
        return res.status(400).json({
            msg: "No existe usuario"
        });
    }
    //Validamos password
    const passwordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordValid) {
        return res.status(400).json({
            msg: "Password Incorrecto"
        });
    }
    // Generamos token 
    const token = jsonwebtoken_1.default.sign({
        userName: userName
    }, process.env.SECRET_KEY || 'pepito123');
    res.json(token);
});
exports.loginUser = loginUser;
