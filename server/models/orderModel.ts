import mongoose from 'mongoose';
import { IOrder } from '../config/interface';

const orderSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Types.ObjectId,
			ref: 'user'
		},
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			require: true
		},
		products: {
			type: [],
			required: true
		},
		total: {
			type: Number,
			require: true
		},
		address: {
			type: String,
			required: true
		},
		describe: {
			type: String,
			required: true
		},
		status: {
			type: String,
			default: 'delivering'
		}
	},
	{ timestamps: true }
);
const order = mongoose.model<IOrder>('order', orderSchema);
export default order;
