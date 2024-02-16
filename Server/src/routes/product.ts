import { Router } from 'express'
import { deleteProduct, getOneProduct, getProducts, updateProduct, newProduct, getProductsByName } from '../controllers/product';
import validateToken from './validate-token';

import multer from "multer";
const storage = require('../db/multer')
const uploader = multer({ storage })

const router = Router();

router.get('/', getProducts)//SEQUELIZE;
router.put('/:id', validateToken, updateProduct)//SEQUELIZE;
router.delete('/:id', validateToken, deleteProduct)//SEQUELIZE;
router.post('/:idAdmin', validateToken, uploader.single('file'), newProduct)//SEQUELIZE;
router.get('/:id', getOneProduct)//SEQUELIZE;
router.get('/pbn/:name', getProductsByName)//SEQUELIZE;

export default router;