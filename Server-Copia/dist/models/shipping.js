"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shipping = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Shipping = connection_1.default.define('shippings', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    costForKm: {
        type: sequelize_1.DataTypes.REAL,
        allowNull: false
    },
    costShipping: {
        type: sequelize_1.DataTypes.REAL,
        allowNull: false
    },
    postalCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
});
