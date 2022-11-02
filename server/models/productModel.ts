import mongoose from 'mongoose';
import { IProduct } from '../config/interface';

const productSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Types.ObjectId,
			ref: 'user'
		},
		title: {
			type: String,
			require: true
		},
		describe: {
			type: String,
			require: true
		},
		price: {
			type: Number,
			require: true
		},
		imageArray: {
			type: []
		},
		detail: {
			type: String,
			required: true
		},
		category: {
			type: mongoose.Types.ObjectId,
			ref: 'category'
		}
	},
	{
		timestamps: true
	}
);
const product = mongoose.model<IProduct>('product', productSchema);
export default product;
