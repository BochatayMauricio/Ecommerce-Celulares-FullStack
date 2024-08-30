"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Domicile = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Domicile = connection_1.default.define('domicile', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    postalCode: {
        type: sequelize_1.DataTypes.STRING,
    },
    street: {
        type: sequelize_1.DataTypes.STRING,
    },
    number: {
        type: sequelize_1.DataTypes.INTEGER,
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['postalCode', 'street', 'number'] // Aquí defines los campos que deben ser únicos en combinación
        }
    ]
});
