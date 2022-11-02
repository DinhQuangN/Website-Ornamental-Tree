import { Request } from 'express';
import { Document } from 'mongoose';

export interface IUser extends Document {
	name: string;
	account: string;
	password: string;
	avatar: string;
	role: string;
	rf_token?: string;
	_doc: object;
}
interface INewUser {
	name: string;
	account: string;
	password: string;
}
export interface IDecodedToken extends INewUser {
	id?: string;
	iat?: string;
	exp?: string;
}
export interface IReqAuth extends Request {
	user?: IUser;
}
export interface IAccessory extends Document {
	user: IUser;
	title: string;
	describe: string;
	price: number;
	imageArray: string[];
	detail: string;
	_doc: object;
}
export interface ICategory extends Document {
	name: string;
	role: string;
	_doc: object;
}

export interface IProduct extends Document {
	user: IUser;
	title: string;
	describe: string;
	price: number;
	imageArray: string[];
	detail: string;
	category: ICategory;
}
export interface ISlider {
	image: string;
}
