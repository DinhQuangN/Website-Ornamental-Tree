import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { IReqAuth } from '../config/interface';
import OrderMessage from '../models/orderModel';
const Pagination = (req: Request) => {
	let page = Number(req.query.page) * 1 || 1;
	let limit = Number(req.query.limit) * 1 || 1;
	let skip = (page - 1) * limit;
	return { page, limit, skip };
};
export const createOrder = async (req: IReqAuth, res: Response) => {
	if (!req.user) {
		return res.status(404).json({ message: 'Invalid Authentication' });
	}
	try {
		const { name, products, describe, totalMoney, address, email } = req.body;
		const newOrder = new OrderMessage({
			userId: req.user,
			products,
			name,
			describe,
			total: totalMoney,
			address,
			email
		});
		await newOrder.save();
		res.status(200).json({ message: 'Order Success' });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
export const getOrder = async (req: Request, res: Response) => {
	const { limit, skip } = Pagination(req);
	try {
		const data = await OrderMessage.aggregate([
			{
				$facet: {
					totalData: [
						{
							$lookup: {
								from: 'users',
								let: { user_id: '$userId' },
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
					totalCount: [
						{
							$count: 'count'
						}
					]
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
export const getOrderByUser = async (req: Request, res: Response) => {
	const { limit, skip } = Pagination(req);
	try {
		const data = await OrderMessage.aggregate([
			{
				$facet: {
					totalData: [
						{
							$match: {
								userId: new mongoose.Types.ObjectId(req.params.userId)
							}
						},
						{
							$sort: { createdAt: -1 }
						},
						{ $skip: skip },
						{ $limit: limit }
					],
					totalCount: [
						{
							$match: {
								userId: new mongoose.Types.ObjectId(req.params.userId)
							}
						},
						{
							$count: 'count'
						}
					]
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
export const groupDate = async (req: Request, res: Response) => {
	try {
		const data = await OrderMessage.aggregate([
			{
				$project: {
					createdAt: {
						$dateToString: {
							format: '%Y-%m-%d',
							date: '$createdAt'
						}
					}
				}
			},
			{
				$group: {
					_id: '$createdAt',
					count: { $sum: 1 }
				}
			},
			{
				$sort: {
					_id: 1
				}
			}
		]);
		res.status(200).json(data);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
