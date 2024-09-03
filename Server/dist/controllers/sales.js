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
exports.postSell = exports.getOneSales = exports.getSales = void 0;
const sales_1 = require("../models/sales");
const product_1 = require("../models/product");
const connection_1 = __importDefault(require("../db/connection"));
const getSales = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { QueryTypes } = require('sequelize');
    const saleList = yield connection_1.default.query("SELECT u.dni, u.name, p.model, s.quantity, d.id as idDomicile, d.street, d.number, s.createdAt FROM sales s INNER JOIN users u ON u.id = s.idCustomer INNER JOIN products p ON p.id = s.idProduct INNER JOIN domiciles d ON d.id = s.idDomicile;", { type: QueryTypes.SELECT });
    if (saleList.length > 0) {
        response.status(200).json(saleList);
    }
    else {
        response.status(404).send({ msg: 'No hay ventas registradas' });
    }
});
exports.getSales = getSales;
const getOneSales = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.idCustomer;
    const { QueryTypes } = require('sequelize');
    const saleList = yield connection_1.default.query(`SELECT * FROM sales INNER JOIN users ON users.id = sales.idCustomer INNER JOIN products ON products.id = sales.idProduct WHERE users.id = ${id}`, { type: QueryTypes.SELECT });
    if (saleList.length > 0) {
        response.status(200).json(saleList);
    }
    else {
        response.status(404).send({ msg: 'No hay ventas registradas al cliente' });
    }
});
exports.getOneSales = getOneSales;
const postSell = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = request;
    for (let j = 0; j < body.length; j++) {
        try {
            const produc = yield product_1.Product.findOne({ where: { id: body[j].idProduct } });
            yield sales_1.Sales.create({
                idCustomer: body[j].idCustomer,
                idProduct: body[j].idProduct,
                idDomicile: body[j].idDomicile,
                quantity: body[j].quantity,
                idShipping: null
            });
            yield product_1.Product.update({ stock: (produc === null || produc === void 0 ? void 0 : produc.dataValues.stock) - body[j].quantity }, { where: { id: body[j].idProduct } });
            return response.status(200).send({ msg: 'Correcto' });
        }
        catch (error) {
            return response.status(400).send({ msg: 'No se pudo cargar' });
        }
    }
});
exports.postSell = postSell;
