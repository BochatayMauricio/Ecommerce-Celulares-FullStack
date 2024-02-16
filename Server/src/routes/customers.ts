import { Router } from "express";
import { deleteCustomer, getCustomers, getSalesUser, updateCustomer } from "../controllers/customers";
import { loginUser } from "../controllers/user";
import validateToken from "./validate-token";


const router = Router();

router.get('/', getCustomers)//SEQUELIZE;
router.delete('/:dni', validateToken, deleteCustomer)//SEQUELIZE;
router.patch('/:dni', validateToken, updateCustomer)//SEQUELIZE;
router.post('/login', loginUser)//SEQUELIZE;
router.get('/:id', validateToken, getSalesUser)//QUERY;



export default router;