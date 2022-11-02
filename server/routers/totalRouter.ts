import express from 'express';
import stripeCheck from '../controllers/stripeController';

const router = express.Router();

router.post('/payment', stripeCheck);

export default router;
