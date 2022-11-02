import { Request, Response } from 'express';
import { IReqAuth } from '../config/interface';
import SliderMessage from '../models/sliderModel';

export const createSlider = async (req: IReqAuth, res: Response) => {
	if (!req.user)
		return res.status(404).json({ message: 'Invalid Authentication' });
	try {
		const { image } = req.body;
		const newData = new SliderMessage({ image });
		await newData.save();
		res.status(200).json({ message: 'Create Success' });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
export const getSlider = async (req: Request, res: Response) => {
	try {
		const data = await SliderMessage.find();
		res.status(200).json(data);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
export const updateSlider = async (req: IReqAuth, res: Response) => {
	if (!req.user)
		return res.status(404).json({ message: 'Invalid Authentication' });
	try {
		const { image } = req.body;
		await SliderMessage.findByIdAndUpdate({ _id: req.params.id }, { image });
		res.status(200).json({ message: 'Update Success' });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
export const deleteSlider = async (req: IReqAuth, res: Response) => {
	if (!req.user)
		return res.status(404).json({ message: 'Invalid Authentication' });
	try {
		await SliderMessage.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: 'Delete Success' });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
