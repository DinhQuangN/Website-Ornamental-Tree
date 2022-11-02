import mongoose from 'mongoose';
import { ISlider } from '../config/interface';

const sliderSchema = new mongoose.Schema(
	{
		image: {
			type: String,
			require: true
		}
	},
	{ timestamps: true }
);
const slider = mongoose.model<ISlider>('slider', sliderSchema);
export default slider;
