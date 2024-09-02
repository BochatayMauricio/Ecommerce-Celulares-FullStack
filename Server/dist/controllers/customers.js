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
exports.getSalesUser = exports.getCustomer = exports.deleteCustomer = exports.updateCustomer = exports.getCustomers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const connection_1 = __importDefault(require("../db/connection"));
const getCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerList = yield user_1.User.findAll({
            where: {
                isAdmin: false
            }
        });
        if (customerList.length > 0) {
            res.status(200).json(customerList);
        }
        else {
            res.status(404).send({ msg: 'No hay clientes cargados' });
        }
    }
    catch (error) {
        return res.status(400).send({ msg: error });
    }
});
exports.getCustomers = getCustomers;
const updateCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const dni = req.params.dni;
    if (email == "" || email == undefined) {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        try {
            yield user_1.User.update({
                password: hashedPassword
            }, {
                where: {
                    dni: dni
                }
            });
            return res.status(200).json({
                msg: 'Password Actualizada',
                body: hashedPassword, password, User: user_1.User
            });
        }
        catch (error) {
            return res.status(400).json({
                msg: "No se encontro el usuario"
            });
        }
    }
    else {
        const emailExist = yield user_1.User.findOne({
            where: {
                email: email
            }
        });
        if (emailExist) {
            return res.status(400).json({
                msg: 'Email Ya Existente'
            });
        }
        try {
            yield user_1.User.update({
                email: email
            }, {
                where: {
                    dni: dni
                }
            });
            return res.status(200).json({
                msg: "Actualizado"
            });
        }
        catch (error) {
            return res.status(400).send({
                msg: `No se encontro el usuario`
            });
        }
    }
    ;
});
exports.updateCustomer = updateCustomer;
const deleteCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni } = req.params;
    try {
        const customer = yield user_1.User.destroy({
            where: {
                dni: dni,
                isAdmin: false
            }
        });
        if (customer) {
            return res.status(200).send({ msg: 'Cliente Eliminado' });
        }
        return res.status(402).send({
            msg: 'No se encontró el cliente'
        });
    }
    catch (error) {
        return res.status(400).send({ msg: error });
    }
});
exports.deleteCustomer = deleteCustomer;
const getCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    try {
        const oneUser = yield user_1.User.findOne({ where: { email: email } });
        if (!oneUser) {
            return res.status(402).send({
                msg: 'No se encontro este usuario!'
            });
        }
        return res.status(200).json(oneUser);
    }
    catch (error) {
        return res.status(400).send({ msg: error });
    }
});
exports.getCustomer = getCustomer;
const getSalesUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    // Extraemos el id de la ruta
    const id = request.params.id;
    // Extraemos metadatos Querytypes y definimos la Query con Querytypes.SELECT
    const { QueryTypes } = require('sequelize');
    try {
        const saleList = yield connection_1.default.query(`SELECT * FROM sales INNER JOIN users ON users.id = sales.idCustomer INNER JOIN products ON products.id = sales.idProduct WHERE users.id = ${id}`, { type: QueryTypes.SELECT });
        if (saleList.length > 0) {
            return response.status(200).json(saleList);
        }
        else {
            return response.status(404).send({ msg: 'No hay ventas registradas al cliente' });
        }
    }
    catch (error) {
        return response.status(400).send({ msg: error });
    }
});
exports.getSalesUser = getSalesUser;
