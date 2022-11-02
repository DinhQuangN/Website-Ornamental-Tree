import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IDecodedToken, IReqAuth } from '../config/interface';
import UserMessage from '../models/userModel';

const auth = async (req: IReqAuth, res: Response, next: NextFunction) => {
	try {
		const token = req.header('Authorization');
		if (!token)
			return res.status(404).json({ message: 'Invalid Authentication' });
		const decode = jwt.verify(token, `${process.env.ACCESS}`) as IDecodedToken;
		if (!decode)
			return res.status(404).json({ message: 'Invalid Authentication' });
		const user = await UserMessage.findOne({ _id: decode.id }).select(
			'-password'
		);
		if (!user) return res.status(404).json({ message: 'User does not exist' });
		req.user = user;
		next();
	} catch (error: any) {
		res.status(500).json({ msg: error.message });
	}
};
export default auth;
