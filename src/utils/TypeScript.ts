import { ChangeEvent, FormEvent } from 'react';
export type InputChange = ChangeEvent<
	HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;
export type FormSubmit = FormEvent<HTMLFormElement>;
export interface IParams {
	id: string;
}

export interface ICategory extends IAccessToken {
	_id?: string;
	name: string;
	role: number;
	createdAt?: string;
	updatedAt?: string;
}
export interface IProduct extends IAccessToken {
	_id: string;
	user: IUser | string;
	title: string;
	describe: string;
	price: string;
	imageArray: IImage[];
	detail: string;
	category: ICategory | string;
	createdAt?: string;
	updatedAt?: string;
}
export interface IImage {
	image: string;
}
export interface IUserLogin {
	account: string;
	password: string;
}
export interface IUser extends IUserLogin {
	_id: string;
	name: string;
	avatar: string;
	role: string;
	createdAt: string;
	updatedAt: string;
}
export interface ISlide extends IAccessToken {
	_id?: string;
	image: string;
	createdAt?: string;
	updatedAt?: string;
}
export interface IPage {
	products: IProduct[];
	total: number | undefined;
}
export interface IPageByCategory extends IAccessToken {
	products: IProduct[];
	total: number | undefined;
	id: string;
	search: string;
}
export interface IRegisterUser {
	firstName: string;
	lastName: string;
	confirmPassword: string;
	account: string;
	password: string;
}
export interface IAccessory extends IAccessToken {
	title: string;
	describe: string;
	price: string;
	imageArray: IImage[];
	detail: string;
}
export interface IAccessToken {
	productId?: string;
	access_token?: string;
}
export interface ICart extends IProduct {
	quantity: number;
}
export interface IOrder {
	name: string;
	total: number;
	address: string;
	status: string;
	email: string;
	products: ICart[];
	describe: string;
	createdAt?: string;
}
export interface IOrders {
	products: IOrder[];
	total: number;
}
export interface ICheckOut {
	name: string;
	address: string;
	email: string;
	describe: string;
}
