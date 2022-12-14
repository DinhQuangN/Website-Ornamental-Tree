import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { addCart } from '../../features/Cart/CartSlice';
import { useAppDispatch } from '../../hooks/useTypedSelector';
import { IImage, IProduct } from '../../utils/TypeScript';
import { vnd } from '../../utils/Valid';
interface IProps {
	product: IProduct;
}
const DisplayProduct: React.FC<IProps> = ({ product }) => {
	const [quantity, setQuantity] = React.useState(1);
	const dispatch = useAppDispatch();
	const handleQuantity = (type: any) => {
		if (type === 'dec') {
			quantity > 1 && setQuantity(quantity - 1);
		} else {
			setQuantity(quantity + 1);
		}
	};
	const handleClick = () => {
		const data = { ...product, quantity };
		dispatch(addCart(data));
	};
	return (
		<>
			<title>{product.title}</title>
			<section id="details">
				<div className="details">
					<div className="product-pic">
						<Swiper
							slidesPerView={1}
							loop={true}
							grabCursor={true}
							// thumbs={{ swiper: activeThumb }}
							modules={[Thumbs]}
							className="frame-pic"
						>
							{product.imageArray?.map((item: IImage, index: number) => (
								<SwiperSlide key={index}>
									<img src={item.image} alt={product.title} />
								</SwiperSlide>
							))}
						</Swiper>
						<Swiper
							slidesPerView={3}
							spaceBetween={30}
							loop={true}
							navigation={true}
							grabCursor={true}
							modules={[Navigation, Thumbs]}
							className="detail swiper"
						>
							{product.imageArray?.map((item: IImage, index: number) => (
								<SwiperSlide key={index}>
									<img src={item.image} alt={product?.title} />
								</SwiperSlide>
							))}
						</Swiper>
					</div>
					<div className="product-comment">
						<h3>{product?.title}</h3>
						<div
							style={{
								fontSize: '1.5rem',
								lineHeight: '1.5',
								letterSpacing: '0.8px'
							}}
							dangerouslySetInnerHTML={{ __html: product.describe }}
						/>
						<p>
							Gi?? b??n: <span>{vnd(product?.price)} ??</span>
						</p>
						<div className="product-cart">
							<div className="quantity">
								<button onClick={() => handleQuantity('dec')}>-</button>
								<p>{quantity}</p>
								<button onClick={() => handleQuantity('inc')}>+</button>
							</div>
							<Link to="/gio-hang" onClick={handleClick}>
								Mua ngay
							</Link>

							<Link to="/gio-hang" onClick={handleClick}>
								Th??m gi??? h??ng
							</Link>
						</div>
					</div>
					<div className="product-commit">
						<div className="commit">
							<h3>V?????N C??Y VI???T CAM K???T:</h3>
							<p>
								Cung c???p c??c lo???i c??y c???nh ??a d???ng v???i gi?? h???p l?? Mi???n ph?? giao
								h??ng cho ????n h??ng tr??n 500.000?? (??p d???ng t???i c??c qu???n n???i th??nh
								TP.HCM)
							</p>
							<p>T?? v???n v?? h?????ng d???n ch??m s??c c??y t???n t??nh</p>
							<p>
								T?? v???n k??? l?????ng c??c v???n ????? phong thu???, h???p m???nh - h???p tu???i Cho
								thu?? c??y c???nh v??n ph??ng
							</p>
							<p>H??? tr??? ?????i tr??? s???n ph???m trong v??ng 3 ng??y sau khi mua</p>
						</div>
					</div>
				</div>
			</section>
			<section id="content-page">
				<div className="content-page">
					<h3>CHI TI???T S???N PH???M</h3>

					<div
						style={{
							marginTop: '30px',
							fontSize: '1.8rem',
							lineHeight: 1.5,
							letterSpacing: '1px '
						}}
						dangerouslySetInnerHTML={{ __html: product?.detail }}
					/>
					{/* <button className="submit" onClick={handleClick}>
						Mua ngay
					</button> */}
					{/* <button>
						<i className="fas fa-thumbs-up"></i>Th??ch
					</button>
					<button>Chia s???</button> */}
					<button>
						<Link to="/" style={{ color: '#fff' }}>
							Xem th??m
						</Link>
					</button>
				</div>
			</section>
		</>
	);
};

export default DisplayProduct;
