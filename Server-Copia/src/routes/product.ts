import { Router } from 'express'
import { deleteProduct, getOneProduct, getProducts, updateProduct, newProduct } from '../controllers/product';
import validateToken from './validate-token';

import multer from "multer";
const storage = require('../db/multer')
const uploader = multer({ storage })

const router = Router();

router.get('/', validateToken, getProducts);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.post('/', uploader.single('file'), newProduct);
router.get('/:id', getOneProduct);

export default router;