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
exports.newPublication = exports.getPublications = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const getPublications = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const idAdmin = parseInt(request.params.id);
    try {
        const { QueryTypes } = require('sequelize');
        const publica = yield connection_1.default.query(`SELECT publications.*, users.name, users.email, products.model, products.image FROM publications INNER JOIN users ON users.id = publications.idAdministrator INNER JOIN products ON products.id = publications.idProduct WHERE users.id = ${idAdmin}`, { type: QueryTypes.SELECT });
        if (publica.length > 0) {
            return response.status(200).json(publica);
        }
        else {
            return response.status(400).send({ msg: 'No hay publicaciones de este administrador' });
        }
    }
    catch (error) {
        return response.status(400).send(error);
    }
});
exports.getPublications = getPublications;
const newPublication = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { idAdmin } = request.params; //recibimos la id del usuario por ruta(parametro)
    const { body } = request; //recibimos el producto
});
exports.newPublication = newPublication;
