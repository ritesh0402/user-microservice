import express from 'express';
import { signup, login, updateUser, deleteUser, listUsers, searchUser } from '../controllers/userController';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);
router.get('/', listUsers);
router.get('/search', searchUser);

export default router;
