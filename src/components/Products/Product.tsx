import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { IProduct } from '../../utils/TypeScript';
import ProductLeft from './ProductLeft';
import ProductRight from './ProductRight';

const Product = () => {
	const { product } = useAppSelector(state => state);
	return (
		<div id="bg-dark">
			<div className="shops container">
				<ProductLeft />
				<div className="shop">
					<div className="title">
						<Link to="">Sản phẩm bán chạy</Link>
					</div>

					{
						<div className="shop-product">
							{product.data?.map((item: IProduct, index: number) => (
								<ProductRight product={item} key={index} />
							))}
						</div>
					}
				</div>
			</div>
		</div>
	);
};

export default Product;
