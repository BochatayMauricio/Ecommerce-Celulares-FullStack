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
            return Res.status(400).json({ msg: 'Ocurrio un Error', error });
        }
    }
});
exports.asignDomicile = asignDomicile;
const getDomiciles = (Req, Res) => __awaiter(void 0, void 0, void 0, function* () {
    const domiciles = yield domicile_1.Domicile.findAll();
    try {
        Res.status(200).json(domiciles);
    }
    catch (e) {
        Res.status(400).json(e);
    }
});
exports.getDomiciles = getDomiciles;
const getOneDomicile = (Req, Res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = Req.params;
    const domicile = yield domicile_1.Domicile.findByPk(id);
    Res.status(200).json(domicile);
});
exports.getOneDomicile = getOneDomicile;
exports.default = exports.asignDomicile;
