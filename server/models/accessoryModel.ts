import mongoose from 'mongoose';
import { IAccessory } from '../config/interface';

const accessorySchema = new mongoose.Schema(
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
			default: 0,
			require: true
		},
		imageArray: {
			type: Array
		},
		detail: {
			type: String,
			require: true
		}
	},
	{ timestamps: true }
);
const accessory = mongoose.model<IAccessory>('accessory', accessorySchema);
export default accessory;
