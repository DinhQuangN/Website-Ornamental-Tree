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
							Giá bán: <span>{vnd(product?.price)} đ</span>
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
								Thêm giỏ hàng
							</Link>
						</div>
					</div>
					<div className="product-commit">
						<div className="commit">
							<h3>VƯỜN CÂY VIỆT CAM KẾT:</h3>
							<p>
								Cung cấp các loại cây cảnh đa dạng với giá hợp lý Miễn phí giao
								hàng cho đơn hàng trên 500.000đ (áp dụng tại các quận nội thành
								TP.HCM)
							</p>
							<p>Tư vấn và hướng dẫn chăm sóc cây tận tình</p>
							<p>
								Tư vấn kỹ lưỡng các vấn đề phong thuỷ, hợp mệnh - hợp tuổi Cho
								thuê cây cảnh văn phòng
							</p>
							<p>Hỗ trợ đổi trả sản phẩm trong vòng 3 ngày sau khi mua</p>
						</div>
					</div>
				</div>
			</section>
			<section id="content-page">
				<div className="content-page">
					<h3>CHI TIẾT SẢN PHẨM</h3>
					<button>
						<i className="fas fa-thumbs-up"></i>Thích
					</button>
					<button>Chia sẻ</button>
					<div
						style={{
							marginTop: '30px',
							fontSize: '1.8rem',
							lineHeight: 1.5,
							letterSpacing: '1px '
						}}
						dangerouslySetInnerHTML={{ __html: product?.detail }}
					/>
					<button className="submit" onClick={handleClick}>
						Mua ngay
					</button>
				</div>
			</section>
		</>
	);
};

export default DisplayProduct;
