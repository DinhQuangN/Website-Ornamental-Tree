import express from 'express';
import {
	createOrder,
	getOrder,
	getOrderByUser,
	groupDate
} from '../controllers/orderController';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/createOrder', auth, createOrder);
router.get('/getOrder', getOrder);
router.get('/getOrderByUser/:userId', getOrderByUser);
router.get('/getOrderUser', groupDate);

export default router;
