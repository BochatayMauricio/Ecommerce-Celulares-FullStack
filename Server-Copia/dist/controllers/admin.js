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
exports.newAdmin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const admin_1 = require("../models/admin");
const newAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email, name, surname, dni, isAdmin } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    //Validacion de si el usuario ya existe en la bd
    const user = yield admin_1.Admin.findOne({ where: { email: email } });
    if (user) {
        return res.status(400).json({
            msg: `Ya existe un usuario con el mail ${email}`
        });
    }
    try {
        yield admin_1.Admin.create({
            email: email,
            password: hashedPassword,
            name: name,
            surname: surname,
            dni: dni,
            isAdmin: isAdmin
        });
        res.json({
            msg: ` usuario creado exitosamente`,
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un Error',
            error
        });
    }
});
exports.newAdmin = newAdmin;
