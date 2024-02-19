import { Router } from "express";
import { deleteCustomer, getCustomers, getSalesUser, updateCustomer } from "../controllers/customers";
import { loginUser } from "../controllers/user";
import validateToken from "./validate-token";


const router = Router();

router.get('/', getCustomers)//SEQUELIZE;
router.delete('/:dni', deleteCustomer)//SEQUELIZE;
router.patch('/:dni', updateCustomer)//SEQUELIZE;
router.post('/login', loginUser)//SEQUELIZE;
router.get('/:id', getSalesUser)//QUERY;



export default router;