import React from 'react';
import NotFound from '../../../components/NotFound';
import { useAppSelector } from '../../../hooks/useTypedSelector';
import AdminList from '../../pages/AdminList';
import FormOrder from './FormOrder';

const Order: React.FC = () => {
	const { auth } = useAppSelector(state => state);
	const isActive: string = 'isActive';
	return (
		<div className="admin">
			<title>Admin Sản Phẩm</title>
			{auth.data?.user?.role === 'admin' ? (
				<div className="adminContainer">
					<div className="adminNav">
						<AdminList order={isActive} />
						<FormOrder />
					</div>
				</div>
			) : (
				<NotFound />
			)}
		</div>
	);
};

export default Order;
