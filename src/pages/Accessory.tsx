import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Pagination from '../components/Pagination/Pagination';
import ProductLeft from '../components/Products/ProductLeft';
import ProductRight from '../components/Products/ProductRight';
import { getAccessory } from '../features/Accessory/AccessorySlice';
import { useAppDispatch, useAppSelector } from '../hooks/useTypedSelector';
import { IProduct } from '../utils/TypeScript';

const Accessory: React.FC = () => {
	const { accessory } = useAppSelector(state => state);
	const dispatch = useAppDispatch();
	const { search } = useLocation();
	useEffect(() => {
		dispatch(getAccessory(search));
	}, [dispatch, search]);
	const handlePagination = (num: number) => {
		const search = `?page=${num}`;
		dispatch(getAccessory(search));
	};
	return (
		<div id="bg-dark">
			<title>Phụ Kiện Sản Phẩm</title>
			<div className="shops container">
				<ProductLeft />
				<div className="shop">
					<div className="title">
						<Link to="">Những sản phẩm phụ kiện cho cây cảnh</Link>
					</div>
					<div className="shop-product">
						{accessory.data?.products.map((item: IProduct, index: number) => (
							<ProductRight product={item} key={index} />
						))}
					</div>
					{accessory.data?.total !== undefined && accessory.data.total > 1 && (
						<Pagination
							totalPage={accessory.data?.total}
							callback={handlePagination}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default Accessory;
