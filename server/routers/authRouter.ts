import express from 'express';
import {
	activeAccount,
	login,
	logout,
	refreshToken,
	Register
} from '../controllers/authController';
import auth from '../middleware/auth';
const router = express.Router();

router.post('/register', Register);
router.post('/active', activeAccount);
router.post('/login', login);
router.get('/refresh_token', refreshToken);
router.get('/logout', auth, logout);
export default router;
