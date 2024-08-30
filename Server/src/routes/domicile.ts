import { Router } from "express";
import { asignDomicile, getDomiciles } from "../controllers/domicile";


const router = Router();

router.get('/', getDomiciles)
router.post('/', asignDomicile)

export default router;