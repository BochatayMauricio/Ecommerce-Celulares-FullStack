import { Router } from "express";
import { asignDomicile, getDomiciles, getOneDomicile } from "../controllers/domicile";


const router = Router();

router.get('/', getDomiciles)
router.post('/', asignDomicile)
router.get('/:id', getOneDomicile)
export default router;