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
exports.getUser = exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email, name, surname, dni, isAdmin } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    //Validacion de si el usuario ya existe en la bd
    let user = yield user_1.User.findOne({ where: { email: email } });
    if (user) {
        return res.status(400).send({
            msg: `Ya existe un usuario con el mail ${email}`
        });
    }
    user = yield user_1.User.findOne({ where: { dni: dni } });
    if (user) {
        return res.status(400).send({
            msg: `Ya existe un usuario con el dni ${dni}`
        });
    }
    try {
        yield user_1.User.create({
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
        res.status(400).send({
            msg: error
        });
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, isAdmin } = req.body;
    try {
        const user = yield user_1.User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(400).send({
                msg: "No existe usuario"
            });
        }
        //Validamos password
        const passwordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordValid) {
            return res.status(400).send({
                msg: "Password Incorrecto"
            });
        }
        if (user.isAdmin != isAdmin) {
            if (user.isAdmin) {
                return res.status(400).send({
                    msg: "No es un Cliente"
                });
            }
            else {
                return res.status(400).send({
                    msg: "No es Administrador"
                });
            }
        }
        try {
            // Generamos token
            const token = jsonwebtoken_1.default.sign({
                email: user.email,
                isAdmin: user.isAdmin
            }, process.env.SECRET_KEY || 'pepito123');
            const obj = {
                tok: token,
                us: user,
            };
            return res.status(200).json(obj);
        }
        catch (error) {
            return res.status(400).send({
                msg: 'No se pudo generar el token'
            });
        }
    }
    catch (error) {
        return res.status(400).send({
            msg: error
        });
    }
});
exports.loginUser = loginUser;
const getUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenBarer = request.headers['authorization'];
    let emailToken = '';
    const token = tokenBarer === null || tokenBarer === void 0 ? void 0 : tokenBarer.slice(7); //necesito el token, sin el Bearer que son los primeros 7 caracteres
    // const payload = jwt.decode(token!); //datos del usuario.
    jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || 'pepito123', (error, payload) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            return response.status(403).send({ msg: 'No autorizado' });
        }
        else {
            emailToken = payload.email;
        }
    }));
    const user = yield user_1.User.findOne({ where: { email: emailToken } });
    try {
        return response.status(200).json(user);
    }
    catch (_a) {
        return response.status(403).send({ msg: 'Token incorrecto' });
    }
});
exports.getUser = getUser;
