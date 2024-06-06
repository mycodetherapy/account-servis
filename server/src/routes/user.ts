import express from 'express';
import { register, login, editUser, getUsers } from '../controllers/user';
import upload from '../middleware/upload';

const router = express.Router();

router.post('/account/register', upload.single('profilePhoto'), register);
router.post('/account/login', login);
router.patch('/:id', upload.single('profilePhoto'), editUser);
router.get('/', getUsers);

export default router;

