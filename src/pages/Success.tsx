import React from 'react';
import { Link } from 'react-router-dom';

const Success: React.FC = () => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				marginTop: '35px',
				flexDirection: 'column'
			}}
		>
			<h2 style={{ fontSize: '32px', lineHeight: '1.5', fontWeight: '500' }}>
				Thanh toán thành công
			</h2>
			<Link
				to="/"
				style={{
					padding: '12px 25px',
					fontSize: '20px',
					background: 'green',
					color: '#fff',
					borderRadius: '10px',
					boxShadow: '0 0 8px 0 rgba(0,0,0,0.3)',
					marginTop: '5px',
					lineHeight: '1.5',
					letterSpacing: '0.3px'
				}}
			>
				Tiếp tục xem sản phẩm
			</Link>
		</div>
	);
};

export default Success;
