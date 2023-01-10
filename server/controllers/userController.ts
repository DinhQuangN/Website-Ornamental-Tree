import { Request, Response } from 'express';
import { IReqAuth } from '../config/interface';
import UserModel from '../models/userModel';

export const getUser = async (req: IReqAuth, res: Response) => {
	try {
		const data = await UserModel.find().select('-password');
		res.status(200).json(data);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
export const updateRoleUser = async (req: Request, res: Response) => {
	try {
		const { role, id } = req.body;
		await UserModel.findByIdAndUpdate(
			{
				_id: id
			},
			{ role: role }
		);
		res.status(200).json({ message: 'update success' });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
