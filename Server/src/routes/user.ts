import { Router } from "express";
import { getUser, loginUser, newUser } from "../controllers/user";
import { getCustomer } from "../controllers/customers";
import validateToken from "./validate-token";



const router = Router();


router.post('/login', loginUser);
router.get('/login/:email', getCustomer)
router.post('/', newUser)
router.post('/user_token',getUser);
export default router;