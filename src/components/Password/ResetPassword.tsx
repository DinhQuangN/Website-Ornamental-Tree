import React from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postAPI } from '../../Request';
import { InputChange } from '../../utils/TypeScript';

const ResetPassword: React.FC = () => {
	const { token_id } = useParams();
	const [data, setData] = React.useState({ password: '', confirmPassword: '' });
	const { password, confirmPassword } = data;
	const handleChange = (e: InputChange) => {
		const { name, value } = e.target;
		setData({ ...data, [name]: value });
	};
	const handleResetPassword = async () => {
		if (password !== confirmPassword) {
			return toast.error('Mật khẩu không chính xác');
		}
		const res = await postAPI('resetPassword', { token_id, password });
		toast.success(res.data.message);
		setTimeout(() => {
			window.location.href = '/dang-nhap';
		}, 3000);
	};
	return (
		<section id="navbars" style={{ backgroundColor: '#fff', height: '30vh' }}>
			<div
				className="navbar container"
				style={{
					marginTop: '30px',
					flexDirection: 'column'
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<span
						style={{ fontSize: '18px', marginRight: '15px', width: '200px' }}
					>
						Mật khẩu
					</span>
					<input
						type="password"
						name="password"
						value={password}
						onChange={handleChange}
						style={{
							fontSize: '14px',
							padding: '6px 4px'
						}}
					/>
				</div>
				<div
					style={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}
				>
					<span
						style={{
							fontSize: '18px',
							marginTop: '20px',
							marginRight: '15px',
							width: '200px'
						}}
					>
						Xác nhận lại mật khẩu
					</span>
					<input
						type="password"
						name="confirmPassword"
						value={confirmPassword}
						onChange={handleChange}
						style={{
							fontSize: '14px',
							padding: '6px 4px'
						}}
					/>
				</div>
				<button
					style={{
						marginTop: '30px',
						border: 'none',
						backgroundColor: 'green',
						color: '#fff',
						fontSize: '16px',
						padding: '10px 15px',
						borderRadius: '10px',
						cursor: 'pointer'
					}}
					onClick={handleResetPassword}
				>
					Xác nhận mật khẩu mật khẩu
				</button>
			</div>
		</section>
	);
};

export default ResetPassword;
