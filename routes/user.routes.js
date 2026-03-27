import express from 'express';
import { fetchAllUsers, fetchUserByEmail, fetchUserById } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/getAll', fetchAllUsers);
router.get('/:id', fetchUserById);
router.post('/getByEmail', fetchUserByEmail);

export default router;  