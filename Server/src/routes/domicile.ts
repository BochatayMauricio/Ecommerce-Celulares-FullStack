import { Router } from "express";
import { asignDomicile, getDomiciles, getOneDomicile } from "../controllers/domicile";


const router = Router();

router.get('/', getDomiciles)
router.get('/:id', getOneDomicile)
router.post('/', asignDomicile)

export default router;