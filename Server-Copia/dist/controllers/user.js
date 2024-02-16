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
exports.getCustomer = exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('new user entrando');
    const { password, email, name, surname, dni, isAdmin } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    //Validacion de si el usuario ya existe en la bd
    let user = yield user_1.User.findOne({ where: { email: email } });
    if (user) {
        return res.status(400).json({
            msg: `Ya existe un usuario con el mail ${email}`
        });
    }
    user = yield user_1.User.findOne({ where: { dni: dni } });
    if (user) {
        return res.status(400).json({
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
        res.status(400).json({
            msg: 'Ocurrio un Error',
            error
        });
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, adminLogin } = req.body;
    //Validamos si el usuario existe en la bd
    const user = yield user_1.User.findOne({ where: { email: email } });
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
    if (user.isAdmin != adminLogin) {
        if (user.isAdmin) {
            return res.status(400).json({
                msg: "No es Cliente"
            });
        }
        else {
            return res.status(400).json({
                msg: "No es Admin"
            });
        }
    }
    // Generamos token
    const token = jsonwebtoken_1.default.sign({
        email: email,
        isAdmin: adminLogin
    }, process.env.SECRET_KEY || 'pepito123');
    const obj = {
        tok: token,
        us: user,
    };
    res.json(obj);
});
exports.loginUser = loginUser;
// export const getAdmins = async (req: Request, res: Response) => {
//   connection.query('Select * from users where users.isAdmin is true')
//     .then((users) => {
//       if (users[0].length > 0) {
//         res.status(200).json(users[0])
//       }
//     }).catch(() => {
//       res.status(400).send({
//         msg: 'No hay Administradores Cargados'
//       })
//     })
// }
const getCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    const oneUser = yield user_1.User.findOne({ where: { email: email } });
    res.json(oneUser);
});
exports.getCustomer = getCustomer;
