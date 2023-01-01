import React from 'react';
import { useLocation } from 'react-router-dom';
import Pagination from '../components/Pagination/Pagination';
import { useAppSelector } from '../hooks/useTypedSelector';
import { getAPI } from '../Request';
import { ICart } from '../utils/TypeScript';
import { vnd } from '../utils/Valid';

interface IOrders {
	products: IOrder[];
	total: number;
}
interface IOrder {
	name: string;
	email: string;
	products: ICart[];
	total: number;
	address: string;
	describe: string;
	createdAt?: string;
}
const History: React.FC = () => {
	const [order, setOrder] = React.useState<IOrders>();
	const { auth } = useAppSelector(state => state);
	const userId = auth.data?.user?._id;
	const { search } = useLocation();
	const handlePagination = (num: number) => {
		const search = `?page=${num}`;
		data(search);
	};
	const data = async (search: string) => {
		let limit = 5;
		let value = search ? search : `?page=1`;
		const res = await getAPI(`getOrderByUser/${userId}${value}&limit=${limit}`);
		setOrder(res.data);
	};
	React.useLayoutEffect(() => {
		if (!userId) return;
		data(search);
	}, [userId]);

	return (
		<div className="admin">
			<title>Lịch sử mua hàng</title>
			<div className="adminContainer">
				<div
					className="adminNav"
					style={{
						padding: '15px 30px',
						flexDirection: 'column'
					}}
				>
					<h1>Lịch sử mua hàng</h1>
					<div className="productAdminTable">
						<div style={{ width: '100%' }}>
							<div className="productTable">
								<table>
									<thead>
										<tr>
											<th>ID</th>
											<th>Tên khách hàng</th>
											<th>SĐT liên hệ</th>
											<th>Sản phẩm</th>
											<th>Địa chỉ</th>
											<th>Mô tả</th>
											<th>Ngày mua</th>
											{/* <th>Loại sản phẩm</th> */}
										</tr>
									</thead>
									<tbody>
										{order?.products.map((item: IOrder, index: number) => (
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
														<th
															style={{
																borderBottom: '1px solid #fff'
															}}
														>
															Mô tả sản phẩm
														</th>
													</tr>
													{item.products.map((i, index: number) => (
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
															<td>
																<div
																	dangerouslySetInnerHTML={{
																		__html: i.describe.slice(0, 50) + '...'
																	}}
																></div>
															</td>
														</tr>
													))}
												</td>
												<td>{item.address}</td>
												<td>{item.describe}</td>
												<td>
													{new Date(
														item.createdAt as string
													).toLocaleDateString()}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
							{order?.total && order.total > 1 ? (
								<Pagination
									totalPage={order.total}
									callback={handlePagination}
								/>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default History;
