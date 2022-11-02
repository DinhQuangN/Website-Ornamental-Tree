import React from 'react';
import Product from '../components/Products/Product';
import Slider from '../components/Slider/Slider';

const Home: React.FC = () => {
	return (
		<>
			<title>Vườn cây cảnh, bán cây cảnh</title>
			<Slider />
			<Product />
		</>
	);
};

export default Home;
