import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {
	generateAccessToken,
	generateActiveToken,
	generateRefreshToken
} from '../config/generateToken';
import { IDecodedToken, IReqAuth, IUser } from '../config/interface';
import sendEmail from '../config/sendMail';
import sendEmailForgotPassword from '../config/sendMailForgotPassword';
import { validateEmail } from '../middleware/valid';
import UserMessage from '../models/userModel';

const CLIENT_URL = `${process.env.CLIENT_URL}`;

export const Register = async (req: Request, res: Response) => {
	try {
		const { firstName, lastName, account, password } = req.body;
		const user = await UserMessage.findOne({ account });
		if (user) {
			return res.status(404).json({ message: 'Email already exists' });
		}
		const passwordHash = await bcrypt.hash(password, 12);
		const newUser = {
			name: firstName + ' ' + lastName,
			account,
			password: passwordHash
		};
		const active_token = generateActiveToken(newUser);
		const url = `${CLIENT_URL}/active/${active_token}`;
		if (validateEmail(account)) {
			sendEmail(account, url, 'Xác nhận email');
			return res
				.status(200)
				.json({ message: 'Success! Please check your email' });
		}
		res.status(200).json({ message: 'Register success' });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
export const activeAccount = async (req: Request, res: Response) => {
	try {
		const { active_token } = req.body;
		const decode = jwt.verify(
			active_token,
			`${process.env.ACTIVE}`
		) as IDecodedToken;

		const { name, account, password } = decode;
		const user = await UserMessage.findOne({ account: account });
		if (user)
			return res.status(404).json({ message: 'Account already exists' });
		const new_user = new UserMessage({
			name,
			account,
			password
		});
		await new_user.save();
		res.status(200).json({ message: 'Account has been activated' });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
export const login = async (req: Request, res: Response) => {
	try {
		const { account, password } = req.body;
		const user = await UserMessage.findOne({ account });
		if (!user)
			return res.status(404).json({ message: 'This account does not exist' });
		loginUser(user, password, res);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
export const logout = async (req: IReqAuth, res: Response) => {
	if (!req.user)
		return res.status(404).json({ message: 'Invalid Authentication' });
	try {
		res.clearCookie('refreshToken', { path: '/api/refresh_token' });
		await UserMessage.findOneAndUpdate(
			{ _id: req.user.id },
			{
				rf_token: ''
			}
		);
		return res.status(200).json({ message: 'Logged out' });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
export const refreshToken = async (req: Request, res: Response) => {
	try {
		const rf_token = req.cookies.refreshtoken;

		if (!rf_token)
			return res.status(400).json({ message: 'Please login now!' });

		const decode = jwt.verify(
			rf_token,
			`${process.env.REFRESH}`
		) as IDecodedToken;

		if (!decode.id)
			return res.status(400).json({ message: 'Please login now!' });
		const user = await UserMessage.findById(decode.id).select(
			'-password +rf_token'
		);
		if (!user)
			return res.status(400).json({ message: 'This account does not exist!' });
		if (rf_token !== user.rf_token)
			return res.status(400).json({ message: 'Please login now!' });
		const access_token = generateAccessToken({ id: user.id });
		const refresh_token = generateRefreshToken({ id: user.id }, res);
		await UserMessage.findOneAndUpdate(
			{ _id: user.id },
			{
				rf_token: refresh_token
			}
		);
		res.status(200).json({ access_token, user });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
const loginUser = async (user: IUser, password: string, res: Response) => {
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		return res.status(404).json({ message: 'Password is incorrect' });
	}
	const access_token = generateAccessToken({ id: user.id });
	const refresh_token = generateRefreshToken({ id: user.id }, res);
	await UserMessage.findOneAndUpdate(
		{ _id: user.id },
		{
			rf_token: refresh_token
		}
	);
	res.status(200).json({
		message: 'Login success',
		access_token,
		user: { ...user._doc, password: '' }
	});
};
export const loginGoogle = async (req: Request, res: Response) => {
	try {
		const { name, email, picture } = req.body;
		const password = email + name + picture;
		const passwordHash = await bcrypt.hash(password, 12);
		const user = await UserMessage.findOne({ account: email });
		if (user) {
			loginUser(user, password, res);
		} else {
			const newUser = new UserMessage({
				name,
				account: email,
				password: passwordHash,
				avatar: picture
			});
			await newUser.save();
			loginUser(newUser, password, res);
		}
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
export const forgotPassword = async (req: Request, res: Response) => {
	try {
		const { account } = req.body;
		const user = await UserMessage.findOne({ account: account });
		if (!user) {
			return res.status(404).json({ message: 'error' });
		}
		const newUser = {
			id: user.id,
			account: user.account
		};
		const token_id = generateActiveToken(newUser);
		const url = `${CLIENT_URL}/dat-lai-mat-khau/${token_id}`;
		if (validateEmail(account)) {
			sendEmailForgotPassword(account, url, 'Quên mật khẩu');
			return res
				.status(200)
				.json({ message: 'Please check your email address' });
		}
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
export const resetPassword = async (req: Request, res: Response) => {
	try {
		const { token_id, password } = req.body;
		const data = jwt.verify(token_id, `${process.env.ACTIVE}`) as IDecodedToken;
		const passwordHash = await bcrypt.hash(password, 12);
		await UserMessage.findByIdAndUpdate(
			{ _id: data.id },
			{
				password: passwordHash
			}
		);
		res.status(200).json({ message: 'Cập nhật mật khẩu thành công' });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
