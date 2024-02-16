"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customers_1 = require("../controllers/customers");
const user_1 = require("../controllers/user");
const administrator_1 = require("../controllers/administrator");
const router = (0, express_1.Router)();
router.get('/:dni', administrator_1.getOneAdministrator); //SEQUELIZE;
router.delete('/:dni', administrator_1.deleteAdministrator); //SEQUELIZE;
router.put('/:dni', customers_1.updateCustomer); //SEQUELIZE
router.post('/login', user_1.loginUser); // SEQUELIZE;
router.get('/', administrator_1.getAdministrators); //SEQUELIZE;
router.post('/', user_1.newUser); // SEQUELIZE;
exports.default = router;
