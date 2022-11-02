import React from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { ISlide } from '../../utils/TypeScript';

const Slider: React.FC = () => {
	const { slide } = useAppSelector(state => state);

	return (
		<section id="slides">
			<Swiper
				slidesPerView={1}
				spaceBetween={5}
				loop={true}
				pagination={{ clickable: true }}
				navigation={true}
				autoplay={{ delay: 3000 }}
				modules={[Pagination, Navigation, Autoplay]}
				className="slide container"
			>
				{slide.data?.map((item: ISlide, index: number) => (
					<SwiperSlide key={index}>
						<img src={item.image} alt={item.image} />
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
};

export default Slider;
