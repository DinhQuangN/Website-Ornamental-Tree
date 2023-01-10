import React from 'react';
import { useLocation } from 'react-router-dom';
import DisplayProduct from '../components/Products/DisplayProduct';
import { useAppSelector } from '../hooks/useTypedSelector';
import { getAPI } from '../Request';
import { IProduct } from '../utils/TypeScript';

const Detail: React.FC = () => {
	const [productDetail, setProductDetail] = React.useState<IProduct>();
	const { state } = useLocation();
	const [slice, setSlice] = React.useState(4);
	const { product } = useAppSelector(state => state);
	const [lengthProduct, setLengthProduct] = React.useState<IProduct[]>();
	React.useEffect(() => {
		if (!state) return;
		const getProduct = async () => {
			if (product.data?.find(p => p._id === state)) {
				await getAPI(`get_product/detail/${state}`).then(res =>
					setProductDetail(res.data?.product)
				);
				await getAPI('total_product').then(res => {
					setLengthProduct(res.data);
				});
			} else {
				await getAPI(`accessory/detail/${state}`).then(res =>
					setProductDetail(res.data?.product)
				);
				await getAPI('total_access').then(res => setLengthProduct(res.data));
			}
			return () => setProductDetail(undefined);
		};
		getProduct();
	}, [state, product.data]);
	const [res, setRes] = React.useState<IProduct[]>();
	React.useEffect(() => {
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
			{/* <section id="content-page">
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
			</section> */}
		</>
	);
};

export default Detail;
