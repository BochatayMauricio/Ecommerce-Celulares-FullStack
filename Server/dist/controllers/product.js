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
exports.getProductsByName = exports.getOneProduct = exports.deleteProduct = exports.updateProduct = exports.newProduct = exports.getProducts = exports.getAllProducts = void 0;
const product_1 = require("../models/product");
const publication_1 = require("../models/publication");
const sales_1 = require("../models/sales");
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const brand_1 = require("../models/brand");
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.params.page);
    const size = 3;
    let option = {
        limit: +size,
        offset: (+page * (+size))
    };
    try {
        const querySQL = `SELECT p.id,p.description,p.model,p.price,p.stock,p.image,p.createdAt,b.name as brand FROM products p 
    INNER JOIN brands b ON b.idBrand = p.idBrand 
    LIMIT ${option.limit} OFFSET ${option.offset};`;
        const rows = yield connection_1.default.query(querySQL, {
            type: sequelize_1.QueryTypes.SELECT
        });
        if (!rows) {
            return res.status(404).send({
                msg: 'No hay mas productos'
            });
        }
        const count = yield connection_1.default.query(`SELECT count(p.id) FROM products p WHERE p.stock > 0`);
        return res.status(200).json({
            total: count,
            products: rows
        });
    }
    catch (err) {
        return res.status(400).send({
            msg: err
        });
    }
});
exports.getAllProducts = getAllProducts;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const productList = await Product.findAll();
        const productList = yield connection_1.default.query("SELECT p.id,p.description,p.model,p.price,p.stock,p.image,p.createdAt,b.name as brand FROM products p INNER JOIN brands b ON b.idBrand = p.idBrand", {
            type: sequelize_1.QueryTypes.SELECT
        });
        if (!productList) {
            return res.status(404).send({
                msg: 'No hay productos cargados'
            });
        }
        return res.status(200).json(productList);
    }
    catch (error) {
        return res.status(400).send({
            msg: error
        });
    }
});
exports.getProducts = getProducts;
const newProduct = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { body, file } = request;
    const idAdmin = parseInt(request.params.idAdmin);
    if (file != undefined) {
        const url = file.filename;
        try {
            const brand = yield brand_1.Brand.findOne({ where: { idBrand: Number(body.idBrand) } });
            if (!brand) {
                return response.status(400).send({
                    msg: 'La marca no es reconocida por el sistema'
                });
            }
            const product = yield product_1.Product.create({
                model: body.model,
                idBrand: Number(body.idBrand),
                description: body.description,
                image: url,
                price: Number(body.price),
                stock: Number(body.stock)
            });
            const publication = yield publication_1.Publication.create({
                idProduct: product.dataValues.id,
                idAdministrator: idAdmin
            });
            return response.status(200).send({ msg: "Producto Creado Correctamente", body: product, publication });
        }
        catch (error) {
            return response.status(400).send({ msg: error });
        }
    }
    else {
        return response.status(400).send({ msg: 'Se debe cargar una imagen' });
    }
});
exports.newProduct = newProduct;
const updateProduct = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const { body } = request;
    try {
        const productUpd = yield product_1.Product.update({ price: body.price, stock: body.stock, description: body.description }, { where: { id: id } });
        if (productUpd) {
            return response.status(200).send({ msg: 'Producto actualizado exitosamente' });
        }
        else {
            return response.status(400).send({ msg: 'Producto no encontrado' });
        }
    }
    catch (error) {
        return response.status(400).send({ msg: error });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    try {
        try {
            yield sales_1.Sales.destroy({ where: { idProduct: id } });
        }
        finally {
            try {
                yield publication_1.Publication.destroy({ where: { idProduct: id } });
            }
            finally {
                try {
                    yield product_1.Product.destroy({ where: { id: id } });
                    return response.status(200).send({ msg: 'Producto eliminado correctamente' });
                }
                catch (error) {
                    return response.status(400).send({ msg: error });
                }
            }
        }
    }
    catch (error) {
        return response.status(400).send({ msg: error });
    }
});
exports.deleteProduct = deleteProduct;
const getOneProduct = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { idProd } = request.params;
    try {
        const product = yield product_1.Product.findOne({ where: { id: idProd } });
        if (product) {
            return response.status(200).json(product);
        }
        else {
            return response.status(400).send({ msg: 'Producto no encontrado' });
        }
    }
    catch (error) {
        return response.status(400).send({ msg: error });
    }
});
exports.getOneProduct = getOneProduct;
const getProductsByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    try {
        const productsByName = yield connection_1.default.query(`SELECT p.id,p.description,p.model,p.price,p.stock,p.image,p.createdAt,b.name as brand FROM products p 
      INNER JOIN brands b ON b.idBrand = p.idBrand WHERE name like :search_brand`, {
            replacements: { search_brand: `%${name}%` },
            type: sequelize_1.QueryTypes.SELECT
        });
        if (productsByName) {
            return res.status(200).json(productsByName);
        }
        else {
            return res.status(404).send({ msg: 'No se encontró el producto' });
        }
    }
    catch (error) {
        return res.status(400).send({ msg: error });
    }
});
exports.getProductsByName = getProductsByName;
