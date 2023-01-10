import express from 'express';
import { getUser, updateRoleUser } from '../controllers/userController';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/get_user', auth, getUser);
router.post('/update_role_user', auth, updateRoleUser);

export default router;
