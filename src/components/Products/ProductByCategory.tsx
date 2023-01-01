import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getProductByCategory } from '../../features/Product/ProductByCategorySlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import { IProduct } from '../../utils/TypeScript';
import { removeVietnamese, removeVietnameseTones } from '../../utils/Valid';
import Pagination from '../Pagination/Pagination';
import ProductLeft from './ProductLeft';
import ProductRight from './ProductRight';

const ProductByCategory: React.FC = () => {
	const { id } = useParams();
	const paramsId = id && removeVietnamese(id);
	const { category, productByCategory } = useAppSelector(state => state);
	const dispatch = useAppDispatch();
	const [categoryId, setCategoryId] = React.useState<string>();
	const [products, setProducts] = React.useState<IProduct[]>();
	const [total, setTotal] = React.useState<number>();
	const { search } = useLocation();
	React.useEffect(() => {
		const data = category.data?.find(
			item => removeVietnamese(removeVietnameseTones(item.name)) === paramsId
		);
		if (!data) return;
		setCategoryId(data._id);
	}, [paramsId, category.data]);
	React.useEffect(() => {
		if (!categoryId) return;
		if (productByCategory.data?.id !== categoryId) {
			dispatch(getProductByCategory({ id: categoryId, search }));
		} else {
			setProducts(productByCategory.data.products);
			setTotal(productByCategory.data.total);
		}
	}, [
		categoryId,
		dispatch,
		search,
		productByCategory.data?.id,
		productByCategory.data?.products,
		productByCategory.data?.total
	]);
	const handlePagination = (num: number) => {
		const search = `?page=${num}`;
		if (!categoryId) return;
		dispatch(getProductByCategory({ id: categoryId, search }));
	};
	const title = category.data?.find(
		item => removeVietnamese(removeVietnameseTones(item.name)) === paramsId
	);
	return (
		<div id="bg-dark">
			<title>
				{title?.name?.charAt(0).toUpperCase() + `${title?.name.slice(1)}`}
			</title>
			<div className="shops container">
				<ProductLeft />
				<div className="shop">
					<div className="title">
						<Link to="">Sản phẩm bán chạy</Link>
					</div>
					<div className="shop-product">
						{products?.map((item: IProduct, index: number) => (
							<ProductRight product={item} key={index} />
						))}
					</div>
					{productByCategory.data?.total !== undefined &&
						productByCategory.data?.total > 1 && (
							<Pagination totalPage={total} callback={handlePagination} />
						)}
				</div>
			</div>
		</div>
	);
};

export default ProductByCategory;
