import React from 'react';
import NotFound from '../../components/NotFound';
import { useAppSelector } from '../../hooks/useTypedSelector';
import FormStatistical from '../components/Statistical/FormStatistical';
import AdminList from './AdminList';

const Manager: React.FC = () => {
	const { auth } = useAppSelector(state => state);
	const isActive: string = 'isActive';
	return (
		<div className="admin">
			<title>Admin Thống kê</title>
			{auth.data?.user?.role === 'admin' ? (
				<div className="adminContainer">
					<div className="adminNav">
						<AdminList dash={isActive} />
						<div style={{ width: '100%' }}>
							<FormStatistical />
						</div>
					</div>
				</div>
			) : (
				<NotFound />
			)}
		</div>
	);
};

export default Manager;
