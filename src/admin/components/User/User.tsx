import React from 'react';
import NotFound from '../../../components/NotFound';
import { useAppSelector } from '../../../hooks/useTypedSelector';
import AdminList from '../../pages/AdminList';
import FormUser from './FormUser';

const User: React.FC = () => {
	const { auth } = useAppSelector(state => state);
	const isActive: string = 'isActive';
	return (
		<div className="admin">
			<title>Admin Loại Sản Phẩm</title>
			{auth.data?.user?.role === 'admin' ? (
				<div className="adminContainer">
					<div className="adminNav">
						<AdminList user={isActive} />
						<FormUser />
					</div>
				</div>
			) : (
				<NotFound />
			)}
		</div>
	);
};

export default User;
