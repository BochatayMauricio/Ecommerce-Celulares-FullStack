import { Router } from "express";
import { deleteCustomer, updateCustomer } from "../controllers/customers";
import { getCustomer, loginUser } from "../controllers/user";
import validateToken from "./validate-token";
import { getAdministrators, getOneAdministrator } from "../controllers/administrator";


const router = Router();


router.get('/:dni', getOneAdministrator);
router.delete('/:dni', deleteCustomer);
router.put('/:dni', updateCustomer)
router.post('/login', loginUser);
router.get('/', getAdministrators)
// router.get('/login/:email', getCustomer)


export default router;