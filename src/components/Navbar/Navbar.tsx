import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { ICategory } from '../../utils/TypeScript';
import { removeVietnameseTones } from '../../utils/Valid';

const Navbar: React.FC = () => {
	const [scroll, setScroll] = useState<boolean>(false);
	const [menu, setMenu] = useState<boolean>(false);
	const { category } = useAppSelector(state => state);
	useEffect(() => {
		window.addEventListener('scroll', () => {
			if (
				document.body.scrollTop > 91 ||
				document.documentElement.scrollTop > 91
			) {
				setScroll(true);
			} else {
				setScroll(false);
			}
		});
	});
	return (
		<section id="navbars" className={scroll ? 'shrink' : ' '}>
			<div className="navbar container">
				<div className="navbar_menu">
					<i className="fas fa-bars" onClick={() => setMenu(!menu)}></i>
					<span>Menu</span>
					<ul style={menu ? { display: 'block' } : { display: 'none' }}>
						<li>
							<Link to="/gioi-thieu">Giới thiệu</Link>
						</li>
						<li>
							<Link to="#">
								Cây cảnh
								<div className="triangle-down"></div>
							</Link>

							<ul>
								{category.data?.map(
									(item: ICategory, index: number) =>
										item.role === 0 && (
											<li key={index}>
												<Link
													to={`/chuyen-muc/${removeVietnameseTones(item.name)}`}
												>
													{item.name}
												</Link>
											</li>
										)
								)}
							</ul>
						</li>
						<li>
							<Link to="#">
								chậu cảnh
								<div className="triangle-down"></div>
							</Link>
							<ul>
								{category.data?.map(
									(item: ICategory, index: number) =>
										item.role === 1 && (
											<li key={index}>
												<Link
													to={`/chuyen-muc/${removeVietnameseTones(item.name)}`}
												>
													{item.name}
												</Link>
											</li>
										)
								)}
							</ul>
						</li>
						<li>
							<Link to="/phu-kien-cay-canh">phụ kiện cây cảnh</Link>
						</li>
						<li>
							<Link to="#">hỗ trợ</Link>
						</li>
						<li>
							<Link to="#">liên hệ</Link>
						</li>
					</ul>
				</div>
				<ul>
					<li>
						<Link to="/gioi-thieu">Giới thiệu</Link>
					</li>
					<li>
						<Link to="#">
							Cây cảnh
							<div className="triangle-down"></div>
						</Link>

						<ul>
							{category.data?.map(
								(item: ICategory, index: number) =>
									item.role === 1 && (
										<li key={index}>
											<Link
												to={`/chuyen-muc/${removeVietnameseTones(item.name)}`}
											>
												{item.name}
											</Link>
										</li>
									)
							)}
						</ul>
					</li>
					<li>
						<Link to="#">
							chậu cảnh
							<div className="triangle-down"></div>
						</Link>
						<ul>
							{category.data?.map(
								(item: ICategory, index: number) =>
									item.role === 2 && (
										<li key={index}>
											<Link
												to={`/chuyen-muc/${removeVietnameseTones(item.name)}`}
											>
												{item.name}
											</Link>
										</li>
									)
							)}
						</ul>
					</li>
					<li>
						<Link to="/phu-kien-cay-canh">phụ kiện cây cảnh</Link>
					</li>
					<li>
						<Link to="#">hỗ trợ</Link>
					</li>
					<li>
						<Link to="#">liên hệ</Link>
					</li>
				</ul>
			</div>
		</section>
	);
};

export default Navbar;
