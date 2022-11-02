import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
	return (
		<section id="footer">
			<div className="footer container">
				<div className="menu-footer">
					<div className="left">
						<h3>truy cập nhanh</h3>
						<ul>
							<li>
								<Link to="#">Giới thiệu</Link>
							</li>
							<li>
								<Link to="#">Dịch vụ</Link>
							</li>
							<li>
								<Link to="#">Blog-Tin tức</Link>
							</li>
							<li>
								<Link to="#">hỗ trợ</Link>
							</li>
							<li>
								<Link to="#">chính sách đổi hàng</Link>
							</li>
						</ul>
					</div>
					<div className="right">
						<h3>liên hệ</h3>
						<p>
							Vườn Cây Việt chuyên bán các loại cây cảnh để bàn, cây cảnh phong
							thuỷ, cho thuê cây cảnh,cây cảnh bonsai, tiểu cảnh terrarium và
							cung cấp các dịch vụ liên quan đến cây cảnh. Hotline: 0985507150.
							Email: lienhe@vuoncayviet.com
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Footer;
