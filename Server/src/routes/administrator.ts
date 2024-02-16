import { Router } from "express";
import { updateCustomer } from "../controllers/customers";
import { loginUser, newUser } from "../controllers/user";
import { deleteAdministrator, getAdministrators, getOneAdministrator } from "../controllers/administrator";


const router = Router();


router.get('/:dni', getOneAdministrator); //SEQUELIZE;
router.delete('/:dni', deleteAdministrator); //SEQUELIZE;
router.put('/:dni', updateCustomer); //SEQUELIZE
router.post('/login', loginUser) // SEQUELIZE;
router.get('/', getAdministrators) //SEQUELIZE;
router.post('/', newUser) // SEQUELIZE;


export default router;