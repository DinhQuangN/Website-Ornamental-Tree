import { Request, Response } from 'express';
import ProductMessage from '../models/productModel';

export const getProduct = async (req: Request, res: Response) => {
	try {
		const response = await ProductMessage.find();
		res.status(200).json(response);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
