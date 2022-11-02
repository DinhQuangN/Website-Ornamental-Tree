import NotFound from '../../../components/NotFound';
import { useAppSelector } from '../../../hooks/useTypedSelector';
import AdminList from '../../pages/AdminList';
import FormCategory from './FormCategory';

const Category = () => {
	const { auth } = useAppSelector(state => state);
	const isActive: string = 'isActive';
	return (
		<div className="admin">
			<title>Admin Loại Sản Phẩm</title>
			{auth.data?.user?.role === 'admin' ? (
				<div className="adminContainer">
					<div className="adminNav">
						<AdminList category={isActive} />
						<FormCategory />
					</div>
				</div>
			) : (
				<NotFound />
			)}
		</div>
	);
};

export default Category;
