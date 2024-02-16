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
router.get('/', validate_token_1.default, customers_1.getCustomers);
router.delete('/:dni', customers_1.deleteCustomer);
router.patch('/:dni', customers_1.updateCustomer3);
router.post('/login', user_1.loginUser);
router.get('/:id', customers_1.getSalesUser);
exports.default = router;
