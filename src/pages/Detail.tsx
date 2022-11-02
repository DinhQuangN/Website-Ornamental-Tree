import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DisplayProduct from '../components/Products/DisplayProduct';
import ProductRight from '../components/Products/ProductRight';
import { useAppSelector } from '../hooks/useTypedSelector';
import { getAPI } from '../Request';
import { IProduct } from '../utils/TypeScript';

const Detail: React.FC = () => {
	const [productDetail, setProductDetail] = useState<IProduct>();
	const [slice, setSlice] = useState(4);
	const { product } = useAppSelector(state => state);
	const paramsId = useParams();
	const [lengthProduct, setLengthProduct] = useState<IProduct[]>();
	useEffect(() => {
		if (!paramsId.id) return;
		const getProduct = async () => {
			if (product.data?.find(p => p._id === paramsId.id)) {
				await getAPI(`get_product/detail/${paramsId.id}`).then(res =>
					setProductDetail(res.data?.product)
				);
				await getAPI('total_product').then(res => {
					setLengthProduct(res.data);
				});
			} else {
				await getAPI(`accessory/detail/${paramsId.id}`).then(res =>
					setProductDetail(res.data?.product)
				);
				await getAPI('total_access').then(res => setLengthProduct(res.data));
			}
			return () => setProductDetail(undefined);
		};
		getProduct();
	}, [paramsId.id, product.data]);
	const [res, setRes] = useState<IProduct[]>();
	useEffect(() => {
		if (lengthProduct !== undefined && lengthProduct !== null) {
			const data = lengthProduct
				.map(item => item)
				.filter(p => p.category === productDetail?.category);
			setRes(data);
		}
	}, [lengthProduct, productDetail?.category]);
	return (
		<>
			{productDetail && <DisplayProduct product={productDetail} />}
			<section id="content-page">
				<div className="content-page">
					<h3>Sản phẩm tương tự</h3>
					<div className="shop-product">
						{res?.slice(0, slice).map((item: IProduct, index: number) => (
							<ProductRight product={item} key={index} />
						))}
					</div>

					<button
						style={slice ? { display: 'block' } : { display: 'none' }}
						onClick={() => setSlice(slice + 4)}
					>
						Xem thêm
					</button>
				</div>
			</section>
		</>
	);
};

export default Detail;
