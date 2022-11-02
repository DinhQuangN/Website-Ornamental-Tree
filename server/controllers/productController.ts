import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { IReqAuth } from '../config/interface';
import ProductMessage from '../models/productModel';

const Pagination = (req: IReqAuth) => {
	let page = Number(req.query.page) * 1 || 1;
	let limit = Number(req.query.limit) * 1 || 4;
	let skip = (page - 1) * limit;
	return { page, limit, skip };
};
export const createProduct = async (req: IReqAuth, res: Response) => {
	if (!req.user) {
		return res.status(404).json({ message: 'Invalid Authentication' });
	}
	try {
		const { title, describe, price, imageArray, detail, category } = req.body;
		const newProduct = new ProductMessage({
			user: req.user._id,
			title,
			describe,
			price,
			imageArray,
			detail,
			category
		});
		await newProduct.save();
		res.status(200).json({ message: 'Create Success' });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
export const getProduct = async (req: Request, res: Response) => {
	try {
		const data = await ProductMessage.aggregate([
			{
				$sample: {
					size: 6
				}
			}
		]);
		res.status(200).json(data);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
export const getProductByCategory = async (req: Request, res: Response) => {
	const { limit, skip } = Pagination(req);
	try {
		const data = await ProductMessage.aggregate([
			{
				$facet: {
					totalData: [
						{
							$match: {
								category: new mongoose.Types.ObjectId(req.params.categoryId)
							}
						},
						{
							$lookup: {
								from: 'users',
								let: { user_id: '$user' },
								pipeline: [
									{
										$match: { $expr: { $eq: ['$_id', '$$user_id'] } }
									},
									{ $project: { password: 0 } }
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
						{ $skip: skip },
						{ $limit: limit }
					],
					totalCount: [
						{
							$match: {
								category: new mongoose.Types.ObjectId(req.params.categoryId)
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
export const getProductByUser = async (req: Request, res: Response) => {
	const { limit, skip } = Pagination(req);
	try {
		const data = await ProductMessage.aggregate([
			{
				$facet: {
					totalData: [
						{
							$match: {
								user: new mongoose.Types.ObjectId(req.params.userId)
							}
						},
						{
							$lookup: {
								from: 'users',
								let: { user_id: '$user' },
								pipeline: [
									{ $match: { $expr: { $eq: ['$_id', '$$user_id'] } } },
									{ $project: { password: 0 } }
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
							$match: {
								user: new mongoose.Types.ObjectId(req.params.userId)
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

export const getProductDetail = async (req: Request, res: Response) => {
	try {
		const product = await ProductMessage.findById(req.params.productId);
		res.status(200).json({ product });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

export const getProducts = async (req: Request, res: Response) => {
	const { limit, skip } = Pagination(req);
	try {
		const data = await ProductMessage.aggregate([
			{
				$facet: {
					totalData: [
						{
							$lookup: {
								from: 'categories',
								let: { category_id: '$category' },
								pipeline: [
									{ $match: { $expr: { $eq: ['$_id', '$$category_id'] } } }
								],
								as: 'category'
							}
						},
						{
							$unwind: '$category'
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
export const updateProduct = async (req: IReqAuth, res: Response) => {
	if (!req.user) {
		return res.status(404).json({ message: 'Invalid Authentication' });
	}
	try {
		const { title, describe, price, imageArray, detail, category } = req.body;
		await ProductMessage.findByIdAndUpdate(
			{ _id: req.params.id },
			{
				title,
				describe,
				price,
				imageArray,
				detail,
				category
			}
		);
		res.status(200).json({ message: 'Update Success' });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
export const deleteProduct = async (req: IReqAuth, res: Response) => {
	try {
		await ProductMessage.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: 'Delete Success' });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
