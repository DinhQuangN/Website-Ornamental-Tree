import express from 'express';
import { createOrder, getOrder } from '../controllers/orderController';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/createOrder', auth, createOrder);
router.get('/getOrder', getOrder);

export default router;
