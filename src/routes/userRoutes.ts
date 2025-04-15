import express from 'express';
import validateBody from '../middleware/validate.middleware';
import { registerUser } from '../controllers/users/register';
import { loginUser } from '../controllers/users/login';
import { getUsers } from '../controllers/users/getUser';
import { logoutUser } from '../controllers/users/logout';
import { createUserSchema, updateUserSchema } from '../schemas/validation';
import { verifyUser }  from '../middleware/user.auth'

const router = express.Router();

router.post('/create', validateBody(createUserSchema), registerUser);
router.post('/login', loginUser);
router.get('/getUser', verifyUser, getUsers);
router.get('/logout', verifyUser, logoutUser);


export default router;