"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sales_1 = require("../controllers/sales");
const router = (0, express_1.Router)();
router.get('/', sales_1.getSales); //SEQUELIZE;
router.get('/:idCustomer', sales_1.getOneSales); //SEQUELIZE;
router.post('/', sales_1.postSell); //SEQUELIZE;
exports.default = router;
