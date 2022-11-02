import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { ICategory } from '../../utils/TypeScript';
import { removeVietnameseTones } from '../../utils/Valid';

const ProductLeft = () => {
	const { category } = useAppSelector(state => state);
	return (
		<div className="menu">
			<div className="menu-left">
				<ul className="accordian-ul">
					<li>
						<h3>Cây cảnh</h3>
						<ul>
							{category.data?.map((item: ICategory, index: number) =>
								item.role === 1 ? (
									<li key={index}>
										<Link
											to={`/chuyen-muc/${removeVietnameseTones(item.name)}`}
										>
											{item.name}
										</Link>
									</li>
								) : (
									''
								)
							)}
						</ul>
					</li>
					<li>
						<h3>Chậu cảnh</h3>
						<ul>
							{category.data?.map((item: ICategory, index: number) =>
								item.role === 2 ? (
									<li key={index}>
										<Link
											to={`/chuyen-muc/${removeVietnameseTones(item.name)}`}
										>
											{item.name}
										</Link>
									</li>
								) : (
									''
								)
							)}
						</ul>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default ProductLeft;
