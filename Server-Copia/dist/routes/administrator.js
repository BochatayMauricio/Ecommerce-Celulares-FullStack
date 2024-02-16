"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customers_1 = require("../controllers/customers");
const user_1 = require("../controllers/user");
const administrator_1 = require("../controllers/administrator");
const router = (0, express_1.Router)();
router.get('/:dni', administrator_1.getOneAdministrator);
router.delete('/:dni', customers_1.deleteCustomer);
router.put('/:dni', customers_1.updateCustomer);
router.post('/login', user_1.loginUser);
router.get('/', administrator_1.getAdministrators);
// router.get('/login/:email', getCustomer)
exports.default = router;
