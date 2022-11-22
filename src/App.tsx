import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AccessoryAdmin from './admin/components/Accessory/Accessory';
import CategoryAdmin from './admin/components/Category/Category';
import OrderAdmin from './admin/components/Order/Order';
import ProductAdmin from './admin/components/Product/Product';
import SliderAdmin from './admin/components/Slider/Slider';
import Manager from './admin/pages/Manager';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HeaderBottom from './components/Header/HeaderBottom';
import Navbar from './components/Navbar/Navbar';
import ProductByCategory from './components/Products/ProductByCategory';
import { refreshToken } from './features/Auth/AuthSlice';
import { getCategory } from './features/Category/CategorySlice';
import { getProduct } from './features/Product/ProductSlice';
import { getSlide } from './features/Slide/SlideSlice';
import { useAppDispatch } from './hooks/useTypedSelector';
import Accessory from './pages/Accessory';
import ActivatedEmail from './pages/ActivatedEmail';
import Cart from './pages/Cart';
import Detail from './pages/Detail';
import Home from './pages/Home';
import Introduce from './pages/Introduce';
import Login from './pages/Login';
import Register from './pages/Register';
import Success from './pages/Success';

const App: React.FC = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(getCategory());
		dispatch(getProduct());
		dispatch(getSlide());
		dispatch(refreshToken());
	}, [dispatch]);

	return (
		<>
			<Router>
				<ToastContainer />
				<Header />
				<HeaderBottom />
				<Navbar />
				<Routes>
					<Route path="/" index element={<Home />} />
					<Route path="/dang-nhap" element={<Login />} />
					<Route path="/dang-ki" element={<Register />} />
					<Route path="/active/:active_token" element={<ActivatedEmail />} />
					<Route path="/gioi-thieu" element={<Introduce />} />
					<Route path="/san-pham/:id" element={<Detail />} />
					<Route path="/phu-kien-cay-canh" element={<Accessory />} />
					<Route path="/chuyen-muc/:id" element={<ProductByCategory />} />
					<Route path="/gio-hang" element={<Cart />} />
					<Route path="/success" element={<Success />} />
					<Route path="/admin">
						<Route path="" index element={<Manager />} />
						<Route path="phu-kien-san-pham" element={<AccessoryAdmin />} />
						<Route path="loai-san-pham" element={<CategoryAdmin />} />
						<Route path="san-pham" element={<ProductAdmin />} />
						<Route path="slider" element={<SliderAdmin />} />
						<Route path="order" element={<OrderAdmin />} />
					</Route>
				</Routes>
				<Footer />
			</Router>
		</>
	);
};

export default App;
