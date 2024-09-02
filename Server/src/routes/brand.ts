import { Router } from 'express'
import validateToken from './validate-token';
import { getAllBrands, getBrandById, newBrand } from '../controllers/brand';

const router = Router();

router.get('/',getBrandById);
router.post('/',newBrand);
router.get('/getAll',getAllBrands)
export default router;