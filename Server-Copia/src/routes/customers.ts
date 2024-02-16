import { Router } from "express";
import { deleteCustomer, getCustomers, getSalesUser, updateCustomer, updateCustomer2, updateCustomer3 } from "../controllers/customers";
import { loginUser } from "../controllers/user";
import validateToken from "./validate-token";


const router = Router();

router.get('/', validateToken, getCustomers);
router.delete('/:dni', deleteCustomer);
router.patch('/:dni', updateCustomer3)
router.post('/login', loginUser);
router.get('/:id', getSalesUser);



export default router;