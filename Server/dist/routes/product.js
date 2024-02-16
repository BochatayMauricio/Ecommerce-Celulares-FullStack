"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("../controllers/product");
const validate_token_1 = __importDefault(require("./validate-token"));
const multer_1 = __importDefault(require("multer"));
const storage = require('../db/multer');
const uploader = (0, multer_1.default)({ storage });
const router = (0, express_1.Router)();
router.get('/', product_1.getProducts); //SEQUELIZE;
router.put('/:id', validate_token_1.default, product_1.updateProduct); //SEQUELIZE;
router.delete('/:id', validate_token_1.default, product_1.deleteProduct); //SEQUELIZE;
router.post('/:idAdmin', validate_token_1.default, uploader.single('file'), product_1.newProduct); //SEQUELIZE;
router.get('/:id', product_1.getOneProduct); //SEQUELIZE;
router.get('/pbn/:name', product_1.getProductsByName); //SEQUELIZE;
exports.default = router;
