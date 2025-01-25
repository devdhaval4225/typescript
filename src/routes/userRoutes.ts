import express from 'express';
import { createUser, getAllUsers } from '../controllers/userController';

const router = express.Router();

router.post('/create', createUser);
router.get('/getUser', getAllUsers);

export default router;