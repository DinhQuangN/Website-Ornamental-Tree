import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProductLeft from '../components/Products/ProductLeft';
import ProductRight from '../components/Products/ProductRight';
import { getAPI } from '../Request';
import { IProduct } from '../utils/TypeScript';

const Search: React.FC = () => {
	const search = useLocation();
	const [data, setData] = React.useState<IProduct[]>();
	React.useLayoutEffect(() => {
		const response = async () => {
			const res = await getAPI(`get_product_search${search.search}`);
			setData(res.data);
		};
		response();
	}, [search.search]);
	return (
		<div id="bg-dark">
			<div className="shops container">
				<ProductLeft />
				<div className="shop">
					<div className="title">
						<Link to="">Tìm kiếm sản phẩm</Link>
					</div>

					{
						<div className="shop-product">
							{data?.map((item: IProduct, index: number) => (
								<ProductRight product={item} key={index} />
							))}
						</div>
					}
				</div>
			</div>
		</div>
	);
};

export default Search;
