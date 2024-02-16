"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sales = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const user_1 = require("./user");
const product_1 = require("./product");
exports.Sales = connection_1.default.define('sales', {
    idCustomer: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    idProduct: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    idShipping: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    }
});
exports.Sales.belongsTo(user_1.User, { foreignKey: 'idCustomer' });
user_1.User.hasOne(exports.Sales, { foreignKey: 'idCustomer' });
exports.Sales.belongsTo(product_1.Product, { foreignKey: 'idProduct' });
product_1.Product.hasOne(exports.Sales, { foreignKey: 'idProduct' });
