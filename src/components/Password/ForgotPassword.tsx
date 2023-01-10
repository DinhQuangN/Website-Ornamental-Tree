import { TextField } from '@mui/material';
import React from 'react';
import { toast } from 'react-toastify';
import { postAPI } from '../../Request';
import { InputChange } from '../../utils/TypeScript';

const ForgotPassword: React.FC = () => {
	const [email, setEmail] = React.useState('');
	const handleChange = (e: InputChange) => {
		setEmail(e.target.value);
	};
	const handleForgotPassword = async () => {
		const res = await postAPI('forgotPassword', { account: email });
		toast.success(res.data.message);
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
						style={{ fontSize: '24px', marginRight: '15px', width: '200px' }}
					>
						Tài khoản
					</span>
					<TextField
						variant="outlined"
						label="Email"
						InputLabelProps={{ style: { fontSize: 15 } }}
						inputProps={{ style: { fontSize: 15 } }}
						name="email"
						value={email}
						onChange={handleChange}
						style={{
							backgroundColor: '#fff',
							fontSize: '1.3rem',
							width: '90%'
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
					onClick={handleForgotPassword}
				>
					Quên mật khẩu
				</button>
			</div>
		</section>
	);
};

export default ForgotPassword;
