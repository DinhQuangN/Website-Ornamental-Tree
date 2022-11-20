import React, { useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Pagination from '../../../components/Pagination/Pagination';
import { getAPI } from '../../../Request';
import { IOrders } from '../../../utils/TypeScript';
import { vnd } from '../../../utils/Valid';

const FormOrder: React.FC = () => {
	const [order, setOrder] = useState<IOrders>();
	const { search } = useLocation();
	const handlePagination = (num: number) => {
		const search = `?page=${num}`;
		getOder(search);
	};
	const getOder = async (search: string) => {
		let limit = 5;
		let value = search ? search : `?page=1`;
		const res = await getAPI(`getOrder${value}&limit=${limit}`);
		setOrder(res.data);
	};

	useLayoutEffect(() => {
		getOder(search);
	}, []);

	console.log(order);
	return (
		<div className="productAdmin">
			<div className="productAdminNav">
				<div className="productAdminSearch">
					<input type="text" placeholder="Search" />
					<i className="fas fa-search"></i>
				</div>
			</div>
			<div className="productAdminTable">
				<div style={{ width: '100%' }}>
					<div className="productTable">
						<table>
							<thead>
								<tr>
									<th>ID</th>
									<th>Khách hàng</th>
									<th>Liên hệ</th>
									<th>Sản phẩm</th>
									<th>Tổng tiền</th>
									<th>Trạng thái</th>
									<th>Ngày mua</th>
								</tr>
							</thead>
							{order?.products.map((item, index) => (
								<tbody>
									<tr key={index}>
										<td>{index}</td>
										<td>{item.name}</td>
										<td>{item.email}</td>
										<td>
											<tr>
												<th
													style={{
														borderRight: '1px solid #fff',
														borderBottom: '1px solid #fff'
													}}
												>
													Tên sản phẩm
												</th>
												<th
													style={{
														borderRight: '1px solid #fff',
														borderBottom: '1px solid #fff'
													}}
												>
													Hình ảnh sản phẩm
												</th>
												<th
													style={{
														borderRight: '1px solid #fff',
														borderBottom: '1px solid #fff'
													}}
												>
													Số lượng sản phẩm
												</th>
												<th
													style={{
														borderBottom: '1px solid #fff'
													}}
												>
													Giá sản phẩm
												</th>
											</tr>
											{item.products.map((i, index) => (
												<tr key={index}>
													<td
														style={{
															borderRight: '1px solid #fff'
														}}
													>
														{i.title.slice(0, 15) + '...'}
													</td>
													<td
														style={{
															borderRight: '1px solid #fff'
														}}
													>
														<img src={i.imageArray[0].image} alt="" />
													</td>
													<td
														style={{
															borderRight: '1px solid #fff'
														}}
													>
														{i.quantity}
													</td>
													<td>{vnd(i.price)}</td>
												</tr>
											))}
										</td>
										<td>{vnd(item.total)}</td>
										<td>{item.status ? 'Đã thanh toán' : 'Chưa thanh toán'}</td>
										<td>
											{new Date(item.createdAt as string).toLocaleDateString()}
										</td>
									</tr>
								</tbody>
							))}
						</table>
					</div>
					{order?.total && order.total > 1 ? (
						<Pagination totalPage={order?.total} callback={handlePagination} />
					) : null}
				</div>
			</div>
		</div>
	);
};

export default FormOrder;
