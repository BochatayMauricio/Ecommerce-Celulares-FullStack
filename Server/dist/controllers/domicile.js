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
exports.getOneDomicile = exports.getDomiciles = exports.asignDomicile = void 0;
const domicile_1 = require("../models/domicile");
const asignDomicile = (Req, Res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postalCode, street, number } = Req.body;
    try {
        var domicileExist = yield domicile_1.Domicile.findOne({
            where: {
                postalCode: postalCode,
                street: street,
                number: number
            }
        });
        if (domicileExist) {
            return Res.status(200).json(domicileExist);
        }
        else {
            try {
                domicileExist = yield domicile_1.Domicile.create({
                    postalCode: postalCode,
                    street: street,
                    number: number
                });
                return Res.status(201).json(domicileExist);
            }
            catch (error) {
                return Res.status(400).send({ msg: 'No se pudo crear el domicilio' });
            }
        }
    }
    catch (error) {
        return Res.status(400).send({
            msg: error
        });
    }
});
exports.asignDomicile = asignDomicile;
const getDomiciles = (Req, Res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const domiciles = yield domicile_1.Domicile.findAll();
        Res.status(200).json(domiciles);
    }
    catch (err) {
        Res.status(400).send({
            msg: err
        });
    }
});
exports.getDomiciles = getDomiciles;
const getOneDomicile = (Req, Res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = Req.params;
    try {
        const domicile = yield domicile_1.Domicile.findByPk(id);
        if (domicile) {
            Res.status(200).json(domicile);
        }
        else {
            Res.status(402).send({
                msg: 'Domicilio no encontrado'
            });
        }
    }
    catch (err) {
        Res.status(400).send({
            msg: err
        });
    }
});
exports.getOneDomicile = getOneDomicile;
exports.default = exports.asignDomicile;
