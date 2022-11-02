import { Request, Response } from 'express';
import { IReqAuth } from '../config/interface';
import AccessoryMessage from '../models/accessoryModel';

const Pagination = (req: IReqAuth) => {
	let page = Number(req.query.page) * 1 || 1;
	let limit = Number(req.query.limit) * 1 || 4;
	let skip = (page - 1) * limit;
	return { page, limit, skip };
};
export const createAccessory = async (req: IReqAuth, res: Response) => {
	if (!req.user) {
		return res.status(404).json({ message: 'Invalid Authentication' });
	}
	try {
		const { title, describe, price, imageArray, detail } = req.body;
		const newAccessory = new AccessoryMessage({
			user: req.user._id,
			title,
			describe,
			price,
			imageArray,
			detail
		});
		await newAccessory.save();
		res.status(200).json({ message: 'Create Success' });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
export const getAccessory = async (req: Request, res: Response) => {
	const { limit, skip } = Pagination(req);
	try {
		const data = await AccessoryMessage.aggregate([
			{
				$facet: {
					totalData: [
						{
							$lookup: {
								from: 'users',
								let: { user_id: '$user' },
								pipeline: [
									{ $match: { $expr: { $eq: ['$_id', '$$user_id'] } } }
								],
								as: 'user'
							}
						},
						{
							$unwind: '$user'
						},
						{
							$sort: { createdAt: -1 }
						},
						{
							$skip: skip
						},
						{
							$limit: limit
						}
					],
					totalCount: [{ $count: 'count' }]
				}
			},
			{
				$project: {
					count: { $arrayElemAt: ['$totalCount.count', 0] },
					totalData: 1
				}
			}
		]);
		const products = data[0].totalData;
		const count = data[0].count;
		let total = 0;
		if (count % limit === 0) {
			total = count / limit;
		} else {
			total = Math.floor(count / limit) + 1;
		}
		res.status(200).json({ products, total });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
export const getAccessoryDetail = async (req: Request, res: Response) => {
	try {
		const product = await AccessoryMessage.findById(req.params.productId);
		res.status(200).json({ product });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
export const updateAccessory = async (req: IReqAuth, res: Response) => {
	if (!req.user) {
		return res.status(404).json({ message: 'Invalid Authentication' });
	}
	try {
		const { title, describe, price, imageArray, detail } = req.body;
		const data = {
			title,
			user: req.user._id,
			describe,
			price,
			imageArray,
			detail
		};
		await AccessoryMessage.findByIdAndUpdate({ _id: req.params.id }, data);
		res.status(200).json({ message: 'Update Success' });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
export const deleteAccessory = async (req: IReqAuth, res: Response) => {
	if (!req.user) {
		return res.status(404).json({ message: 'Invalid Authentication' });
	}
	try {
		await AccessoryMessage.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: 'Delete success' });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
export const searchAccessory = async (req: Request, res: Response) => {
	try {
		const search = req.query.search;
		const title = new RegExp(`${search}`, 'i');
		const data = await AccessoryMessage.find({
			title
		});
		res.status(200).json({ products: data, total: 1 });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
