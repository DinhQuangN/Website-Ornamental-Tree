import React from 'react';
import NotFound from '../../../components/NotFound';
import { useAppSelector } from '../../../hooks/useTypedSelector';
import AdminList from '../../pages/AdminList';
import FormSlider from './FormSlider';

const Slider: React.FC = () => {
	const { auth } = useAppSelector(state => state);
	const isActive: string = 'isActive';
	return (
		<div className="admin">
			<title>Admin Slider</title>
			{auth.data?.user?.role === 'admin' ? (
				<div className="adminContainer">
					<div className="adminNav">
						<AdminList slide={isActive} />
						<FormSlider />
					</div>
				</div>
			) : (
				<NotFound />
			)}
		</div>
	);
};

export default Slider;
