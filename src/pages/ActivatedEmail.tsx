import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postAPI } from '../Request';

const ActivatedEmail: React.FC = () => {
	const { active_token } = useParams();
	React.useEffect(() => {
		if (active_token) {
			const active = async () => {
				try {
					const res = await postAPI('active', { active_token });
					toast.success(res.data.message);
				} catch (error: any) {
					toast.error(error.message);
				}
			};
			active();
		}
	}, [active_token]);
	return (
		<div
			style={{
				width: '100%',
				maxWidth: '1200px',
				margin: '0 auto',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column'
			}}
		>
			<p
				style={{
					padding: '30px 0',
					fontSize: '3.5rem',
					textTransform: 'capitalize',
					letterSpacing: '0.1rem',
					lineHeight: '1.5',
					color: 'red',
					fontWeight: '500'
				}}
			>
				Xác nhận Email thành công !
			</p>
			<Link
				to="/dang-nhap"
				style={{
					padding: '10px 15px',
					fontSize: '2rem',
					backgroundColor: '#f28902',
					color: '#fff',
					textTransform: 'capitalize',
					letterSpacing: '0.1rem',
					lineHeight: '1.5',
					fontWeight: '400',
					boxShadow: '0px 0px 6px 0 #0000002c',
					borderRadius: '4px'
				}}
			>
				Quay trở lại đăng nhập
			</Link>
		</div>
	);
};

export default ActivatedEmail;
