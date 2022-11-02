import { Link } from 'react-router-dom';

const HeaderBottom = () => {
	return (
		<section id="headers">
			<div className="header container">
				<div className="left">
					<div className="logo">
						<Link to="/">
							<img src="https://vuoncayviet.com/img/logo.png" alt="" />
						</Link>
					</div>
					<div className="widget-head">
						Vườn cây Việt <br />
						<span>Không chỉ là cây cảnh</span>
					</div>
				</div>
				<div className="right">
					<input type="text" placeholder="Tìm Kiếm" />
					<span>Tìm Kiếm</span>
				</div>
			</div>
		</section>
	);
};

export default HeaderBottom;
