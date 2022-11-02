import { Request, Response } from 'express';
import { IReqAuth } from '../config/interface';
import CategoryMessage from '../models/categoryModel';

export const createCategory = async (req: IReqAuth, res: Response) => {
	if (!req.user) {
		return res.status(404).json({ message: 'Invalid Authorization' });
	}
	try {
		const { name, role } = req.body;
		const category = await CategoryMessage.findOne({ name });
		if (category)
			return res.status(404).json({ message: 'This category already exist!' });
		const newCategory = new CategoryMessage({
			name: name.toLowerCase(),
			role
		});
		await newCategory.save();
		res.status(200).json({ message: 'Create Success' });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
export const getCategory = async (req: Request, res: Response) => {
	try {
		const categories = await CategoryMessage.find();
		res.status(200).json(categories);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
export const updateCategory = async (req: IReqAuth, res: Response) => {
	if (!req.user) {
		return res.status(404).json({ message: 'Invalid Authorization' });
	}
	try {
		const { name, role } = req.body;
		await CategoryMessage.findByIdAndUpdate(
			{ _id: req.params.id },
			{
				name: name.toLowerCase(),
				role: role
			}
		);
		res.status(200).json({ message: 'Update Success' });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
export const deleteCategory = async (req: IReqAuth, res: Response) => {
	if (!req.user) {
		return res.status(404).json({ message: 'Invalid Authorization' });
	}
	try {
		await CategoryMessage.findByIdAndDelete(req.params.id);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
