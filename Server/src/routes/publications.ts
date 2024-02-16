import { Router } from "express";
import { getPublications, newPublication } from "../controllers/publications";



const router = Router();

router.get('/:id', getPublications)//SEQUELIZE;
router.post('/:id', newPublication)//NO HECHA;



export default router;