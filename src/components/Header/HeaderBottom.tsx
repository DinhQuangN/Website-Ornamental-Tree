import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InputChange } from '../../utils/TypeScript';

const HeaderBottom: React.FC = () => {
	const [search, setSearch] = React.useState<string>();
	const history = useNavigate();
	const handleSearch = (e: InputChange) => {
		const { name, value } = e.target;
		setSearch(value);
	};
	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter') {
			history(`tim-kiem?search=${search}`);
		}
	};
	const handleButtonSearch = (e: any) => {
		e.preventDefault();
		history(`tim-kiem?search=${search}`);
	};
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
					<input
						type="text"
						placeholder="Tìm Kiếm"
						name="search"
						value={search}
						onChange={handleSearch}
						onKeyDown={handleKeyDown}
					/>
					<button onClick={handleButtonSearch}>Tìm Kiếm</button>
				</div>
			</div>
		</section>
	);
};

export default HeaderBottom;
