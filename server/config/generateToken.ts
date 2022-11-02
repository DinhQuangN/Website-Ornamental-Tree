import { Response } from 'express';
import jwt from 'jsonwebtoken';
const { ACTIVE, ACCESS, REFRESH } = process.env;

export const generateActiveToken = (payload: object) => {
	return jwt.sign(payload, `${ACTIVE}`, { expiresIn: '30m' });
};
export const generateAccessToken = (payload: object) => {
	return jwt.sign(payload, `${ACCESS}`, { expiresIn: '1d' });
};
export const generateRefreshToken = (payload: object, res: Response) => {
	const refresh_token = jwt.sign(payload, `${REFRESH}`, { expiresIn: '1d' });
	res.cookie('refreshtoken', refresh_token, {
		httpOnly: true,
		path: '/api/refresh_token',
		maxAge: 24 * 60 * 60 * 1000
	});
	return refresh_token;
};
