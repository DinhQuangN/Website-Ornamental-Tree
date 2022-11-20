import { Elements } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CheckOut from '../components/CheckOut/CheckOut';
import {
	deleteCart,
	ICartType,
	updateQuantityCart
} from '../features/Cart/CartSlice';
import { useAppDispatch, useAppSelector } from '../hooks/useTypedSelector';
import getStripe from '../utils/GetStripe';
import { ICart } from '../utils/TypeScript';
import { vnd } from '../utils/Valid';

const Cart: React.FC = () => {
	const [open, setOpen] = useState<boolean>(false);
	const { cart, auth } = useAppSelector(state => state);
	const dispatch = useAppDispatch();
	const history = useNavigate();
	let total: number = 0;
	const showTotal = (cart: ICartType[]) => {
		cart.forEach(e => {
			total += Number(e.price) * e.quantity;
		});
		return total;
	};
	const handleQuantityDec = (id: string, quantity: number) => {
		quantity >= 1 && dispatch(updateQuantityCart({ id, quantity }));
	};
	const handleQuantityInc = (id: string, quantity: number) => {
		dispatch(updateQuantityCart({ id, quantity }));
	};
	const handleDelete = (id: string) => {
		dispatch(deleteCart({ id }));
	};
	return (
		<div className="productCarts">
			<title>Giỏ hàng</title>
			<div className="productCart">
				<h3>Giỏ hàng </h3>
				{cart.length > 0 ? (
					<>
						<table>
							<thead>
								<tr>
									<th>ID</th>
									<th>Hình ảnh</th>
									<th>Tên sản phẩm</th>
									<th>Giá sản phẩm</th>
									<th>Số lượng</th>
									<th>Thành tiền</th>
								</tr>
							</thead>
							<tbody>
								{cart?.map((item: ICart, index: number) => (
									<tr key={index}>
										<td>{index}</td>
										<td>
											<img
												src={item.imageArray[0].image}
												alt={item.title.slice(0, 25) + '...'}
											/>
										</td>
										<td>{item.title.slice(0, 25) + '...'}</td>
										<td>{vnd(item.price)} đ</td>
										<td>
											<div className="quantity">
												<button
													onClick={() =>
														handleQuantityDec(item._id, item.quantity - 1)
													}
												>
													-
												</button>
												<input value={item.quantity} disabled />
												<button
													onClick={() =>
														handleQuantityInc(item._id, item.quantity + 1)
													}
												>
													+
												</button>
											</div>
										</td>
										<td style={{ fontWeight: 500, letterSpacing: '0.8px' }}>
											{vnd(item.quantity * Number(item.price))} đ
										</td>
										<td>
											<button
												style={{ border: 'none' }}
												onClick={() => handleDelete(item._id)}
											>
												<i className="fas fa-trash"></i>
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<div style={{ marginTop: '30px', borderBottom: '1px solid #eee' }}>
							<p
								style={{
									textAlign: 'right',
									fontSize: '2.3rem',
									color: 'red',
									fontWeight: 500,
									opacity: '0.7',
									letterSpacing: '0.8px',
									lineHeight: '1.2'
								}}
							>
								Tổng: {vnd(showTotal(cart))} đ
							</p>
						</div>
						<div className="button">
							<div
								className="check_out"
								style={open ? {} : { display: 'none' }}
							>
								<Elements stripe={getStripe()}>
									<CheckOut setOpen={setOpen} totalMoney={total} />
								</Elements>
							</div>
							<button
								style={{
									backgroundColor: '#ff8000',
									padding: '15px 20px',
									border: 'none',
									fontSize: '1.8rem',
									lineHeight: '1.2',
									letterSpacing: '0.8px',
									boxShadow: '0 0 15px 0 rgba(0,0,0,0.2)',
									marginTop: '15px',
									borderRadius: '10px',
									color: '#fff',
									fontWeight: 500,
									marginRight: '30px'
								}}
								onClick={() => setOpen(!open)}
							>
								Thanh toán
							</button>
							<Link
								to="/"
								style={{
									backgroundColor: '#ff8000',
									padding: '15px 20px',
									border: 'none',
									fontSize: '1.8rem',
									lineHeight: '1.2',
									letterSpacing: '0.8px',
									boxShadow: '0 0 15px 0 rgba(0,0,0,0.2)',
									marginTop: '15px',
									borderRadius: '10px',
									color: '#fff',
									fontWeight: 500,
									marginRight: '30px'
								}}
							>
								Chọn thêm sản phẩm
							</Link>
						</div>
					</>
				) : (
					<div>
						<p
							style={{
								fontSize: '1.8rem',
								lineHeight: '1.5',
								letterSpacing: '0.8px',
								marginTop: '15px'
							}}
						>
							Hiện không có sản phẩm nào trong giỏ hàng của bạn.
						</p>
						<p
							style={{
								fontSize: '1.8rem',
								lineHeight: '1.5',
								letterSpacing: '0.8px'
							}}
						>
							Bạn vui lòng
							<Link to="/" style={{ fontWeight: 700 }}>
								chọn sản phẩm
							</Link>
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Cart;
