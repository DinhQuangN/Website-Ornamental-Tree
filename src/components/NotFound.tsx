import React from 'react';

const NotFound: React.FC = () => {
	return (
		<div style={{ minHeight: 'calc(100vh - 70px )', position: 'relative' }}>
			<h2
				style={{
					position: 'absolute',
					color: '#6c757d',
					top: '50%',
					left: '50%',
					fontSize: '4rem',
					lineHeight: '1.2',
					letterSpacing: '0.25rem',
					fontWeight: '500',
					transform: 'translate(-50%,-50%)'
				}}
			>
				404 | Not Found
			</h2>
		</div>
	);
};

export default NotFound;
