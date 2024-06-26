import express from 'express';
import { register, login, editUser, getUsers, getUserById } from '../controllers/user';
import upload from '../middleware/upload';
import { validateAccount } from '../validation';

const router = express.Router();

router.post('/account/register', upload.single('profilePhoto'), register);
router.post('/account/login', login);
router.patch('/:id', upload.single('profilePhoto'), validateAccount, editUser);
router.get('/', getUsers);
router.get('/:id', getUserById);

export default router;

