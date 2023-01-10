import React from 'react';
import { Link } from 'react-router-dom';
interface IAdminList {
	dash?: string;
	product?: string;
	slide?: string;
	order?: string;
	category?: string;
	accessory?: string;
	user?: string;
}
const AdminList: React.FC<IAdminList> = ({
	dash,
	product,
	slide,
	order,
	category,
	accessory,
	user
}) => {
	return (
		<div className="admin-left">
			<ul>
				<li className={dash}>
					<Link to="/admin">Thống kê</Link>
				</li>
				<li className={product}>
					<Link to="/admin/san-pham">Sản phẩm</Link>
				</li>
				<li className={slide}>
					<Link to="/admin/slider">Slider</Link>
				</li>
				<li className={order}>
					<Link to="/admin/order">Hóa đơn</Link>
				</li>
				<li className={category}>
					<Link to="/admin/loai-san-pham">Loại sản phẩm</Link>
				</li>
				<li className={accessory}>
					<Link to="/admin/phu-kien-san-pham">Phụ kiện</Link>
				</li>
				<li className={user}>
					<Link to="/admin/tai-khoan">Tài khoản</Link>
				</li>
			</ul>
		</div>
	);
};

export default AdminList;
