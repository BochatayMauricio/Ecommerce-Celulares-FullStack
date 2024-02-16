"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Admin = connection_1.default.define('admin', {
    dni: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    surname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: sequelize_1.DataTypes.BOOLEAN
    }
});
