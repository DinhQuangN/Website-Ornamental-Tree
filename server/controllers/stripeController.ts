import { Request, Response } from 'express';
const stripe = require('stripe')(`${process.env.STRIPE}`);

const stripeCheck = async (req: Request, res: Response) => {
	try {
		let { totalMoney, tokenId, describe } = req.body;
		await stripe.paymentIntents.create({
			amount: totalMoney,
			currency: 'VND',
			description: describe,
			payment_method: tokenId,
			confirm: true
		});
		res.status(200).json({ message: 'Payment Success' });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
export default stripeCheck;
