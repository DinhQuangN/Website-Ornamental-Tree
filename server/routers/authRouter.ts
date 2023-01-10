import express from 'express';
import {
	activeAccount,
	forgotPassword,
	login,
	loginGoogle,
	logout,
	refreshToken,
	Register,
	resetPassword
} from '../controllers/authController';
import auth from '../middleware/auth';
const router = express.Router();

router.post('/register', Register);
router.post('/active', activeAccount);
router.post('/login', login);
router.get('/refresh_token', refreshToken);
router.get('/logout', auth, logout);
router.post('/loginGoogle', loginGoogle);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', resetPassword);
export default router;
