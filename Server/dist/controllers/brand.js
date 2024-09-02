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
exports.getAllBrands = exports.newBrand = exports.getBrandById = void 0;
const brand_1 = require("../models/brand");
const getBrandById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idBrand } = req.body;
    try {
        const brand = yield brand_1.Brand.findByPk(idBrand);
        if (!brand) {
            return res.status(404).send({
                msg: 'Marca no encontrada!'
            });
        }
        return res.status(200).send(brand);
    }
    catch (error) {
        return res.status(400).send({ msg: error });
    }
});
exports.getBrandById = getBrandById;
const newBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, maker } = req.body;
    try {
        const searchBrand = yield brand_1.Brand.findOne({ where: { name: name } });
        if (searchBrand) {
            return res.status(406).send({ msg: 'Marca existente' });
        }
        yield brand_1.Brand.create({
            name: name,
            maker: maker
        });
        return res.status(200).send({
            msg: 'Marca registrada correctamente!'
        });
    }
    catch (error) {
        return res.status(400).send({ msg: error });
    }
});
exports.newBrand = newBrand;
const getAllBrands = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const brands = yield brand_1.Brand.findAll();
        if (!brands) {
            return res.status(404).send('No se encontro ninguna marca registrada!');
        }
        return res.status(200).json(brands);
    }
    catch (err) {
        return res.status(400).send({ msg: err });
    }
});
exports.getAllBrands = getAllBrands;
