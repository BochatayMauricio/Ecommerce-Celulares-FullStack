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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneAdministrator = exports.deleteAdministrator = exports.getAdministrators = void 0;
const user_1 = require("../models/user");
const sales_1 = require("../models/sales");
const getAdministrators = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let administratorsList = [];
    try {
        administratorsList = yield user_1.User.findAll({ where: { isAdmin: true } });
    }
    finally {
        if (administratorsList.length === 0) {
            return response.status(400).send({ msg: 'No hay administradores cargados' });
        }
        else {
            return response.status(200).json(administratorsList);
        }
    }
});
exports.getAdministrators = getAdministrators;
const deleteAdministrator = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni } = request.params;
    const admin = yield user_1.User.findOne({
        where: {
            dni: dni
        }
    });
    const sales = yield sales_1.Sales.destroy({
        where: { idCustomer: admin.id }
    });
    const admindeleted = yield user_1.User.destroy({
        where: {
            dni: dni,
            isAdmin: true
        }
    });
    if (admindeleted) {
        response.status(200).send({ msg: 'Administrador Eliminado' }); //HAY QUE VER COMO HACER PARA RETORNAR 404, AUNQUE SE SUPONE QUE SIEMPRE VA A ESTAR LA TUPLA, YA QUE LA ELIMINA DE UN LISTADO
    }
    else {
        response.status(400).send({ msg: 'Ocurrio un Error' });
    }
});
exports.deleteAdministrator = deleteAdministrator;
const getOneAdministrator = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni } = request.params;
    const admin = yield user_1.User.findOne({
        where: {
            dni: dni,
            isAdmin: true
        }
    });
    if (admin) {
        response.status(200).json(admin);
    }
    else {
        response.status(404).send({ msg: 'No encontrado' });
    }
});
exports.getOneAdministrator = getOneAdministrator;
