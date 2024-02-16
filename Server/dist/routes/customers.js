"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customers_1 = require("../controllers/customers");
const user_1 = require("../controllers/user");
const validate_token_1 = __importDefault(require("./validate-token"));
const router = (0, express_1.Router)();
router.get('/', customers_1.getCustomers); //SEQUELIZE;
router.delete('/:dni', validate_token_1.default, customers_1.deleteCustomer); //SEQUELIZE;
router.patch('/:dni', validate_token_1.default, customers_1.updateCustomer); //SEQUELIZE;
router.post('/login', user_1.loginUser); //SEQUELIZE;
router.get('/:id', validate_token_1.default, customers_1.getSalesUser); //QUERY;
exports.default = router;
