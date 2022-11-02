import React from 'react';
import NotFound from '../../../components/NotFound';
import { useAppSelector } from '../../../hooks/useTypedSelector';
import AdminList from '../../pages/AdminList';
import FormAccessory from './FormAccessory';

const Accessory: React.FC = () => {
	const { auth } = useAppSelector(state => state);
	const isActive: string = 'isActive';
	return (
		<div className="admin">
			<title>Admin Phụ kiện Sản Phẩm</title>
			{auth.data?.user?.role === 'admin' ? (
				<div className="adminContainer">
					<div className="adminNav">
						<AdminList accessory={isActive} />
						<FormAccessory />
					</div>
				</div>
			) : (
				<NotFound />
			)}
		</div>
	);
};

export default Accessory;
