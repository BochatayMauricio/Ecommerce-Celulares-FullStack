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
    const saleList = yield connection_1.default.query("SELECT * FROM sales INNER JOIN users ON users.id = sales.idCustomer INNER JOIN products ON products.id = sales.idProduct", { type: QueryTypes.SELECT });
    if (saleList.length > 0) {
        response.status(200).json(saleList);
    }
    else {
        response.status(404).send({ msg: 'No hay ventas registradas' });
    }
});
exports.getSales = getSales;
const getOneSales = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    // Extraemos el id de la ruta
    const id = request.params.idCustomer;
    // Extraemos metadatos Querytypes y definimos la Query con Querytypes.SELECT
    const { QueryTypes } = require('sequelize');
    const saleList = yield connection_1.default.query(`SELECT * FROM sales INNER JOIN users ON users.id = sales.idCustomer INNER JOIN products ON products.id = sales.idProduct WHERE users.id = ${id}`, { type: QueryTypes.SELECT });
    //Validamos si saleList contiene valores
    if (saleList.length > 0) {
        response.status(200).json(saleList);
    }
    else {
        response.status(404).send({ msg: 'No hay ventas registradas al cliente' });
    }
});
exports.getOneSales = getOneSales;
const postSell = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    // recibimos un arreglo de ventas, que hace referencia a una compra por cada producto del carrito
    const { body } = request;
    console.log(body);
    for (let j = 0; j < body.length; j++) {
        try {
            const produc = yield product_1.Product.findOne({ where: { id: body[j].idProduct } });
            yield product_1.Product.update({ stock: (produc === null || produc === void 0 ? void 0 : produc.dataValues.stock) - body[j].quantity }, { where: { id: body[j].idProduct } });
            yield sales_1.Sales.create({
                idCustomer: body[j].idCustomer,
                idProduct: body[j].idProduct,
                quantity: body[j].quantity
            });
        }
        catch (error) {
            return response.status(400).send({ msg: 'No se pudo cargar' });
        }
    }
    return response.status(200).send({ msg: 'Correcto' });
});
exports.postSell = postSell;
