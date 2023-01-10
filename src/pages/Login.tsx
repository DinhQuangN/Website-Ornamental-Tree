import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { signIn } from '../features/Auth/AuthSlice';
import { useAppDispatch } from '../hooks/useTypedSelector';
import { postAPI } from '../Request';
import { FormSubmit, InputChange } from '../utils/TypeScript';

const Login: React.FC = () => {
	const [user, setUser] = React.useState({ account: '', password: '' });
	const [typePass, setTypePass] = React.useState<boolean>(false);
	// const { auth } = useAppSelector(state => state);
	const dispatch = useAppDispatch();
	const { account, password } = user;
	// useEffect(() => {
	// 	if (auth.data?.access_token) {
	// 		window.location.href = '/';
	// 	}
	// 	return;
	// }, [auth]);
	const handleChangeInput = (e: InputChange) => {
		const { value, name } = e.target;
		setUser({ ...user, [name]: value });
	};
	const handleSubmit = (e: FormSubmit) => {
		e.preventDefault();
		dispatch(signIn(user));
	};

	// useEffect(()=>{
	// 	//global google
	// 	google.accounts!.id.initialize(
	// 		client_id:
	// 		callback
	// 	)
	// },[])
	const handleLoginGoogle = useGoogleLogin({
		onSuccess: async response => {
			try {
				const data = await axios.get(
					'https://www.googleapis.com/oauth2/v3/userinfo',
					{
						headers: {
							Authorization: `Bearer ${response.access_token}`
						}
					}
				);
				const res = await postAPI('loginGoogle', data.data);
				if (res.data.message === 'Login success')
					return (window.location.href = '/');
			} catch (error) {
				console.log(error);
			}
		}
	});
	return (
		<div className="limiter">
			<title>Đăng nhập</title>
			<div className="containe">
				<div className="wrap-login">
					<form className="login-form validate-form" onSubmit={handleSubmit}>
						<span className="login-form-title">Đăng nhập</span>
						<div
							className="wrap-input validate-input"
							data-validate="Username is reauired"
						>
							<span className="label-input">Tài khoản</span>
							<input
								className="input"
								type="text"
								name="account"
								value={account}
								onChange={handleChangeInput}
								placeholder="Nhập tài khoản"
							/>
							<span className="focus-input" data-symbol="&#xf206;"></span>
						</div>
						<div
							className="wrap-input validate-input"
							data-validate="Password is reauired"
						>
							<span className="label-input">Mật khẩu</span>
							<input
								className="input"
								type={typePass ? 'text' : 'password'}
								name="password"
								value={password}
								onChange={handleChangeInput}
								placeholder="Nhập mật khẩu"
							/>
							<span className="focus-input" data-symbol="&#xf190;"></span>
							<span onClick={() => setTypePass(!typePass)}>
								{typePass ? (
									<i className="fa fa-eye-slash show" aria-hidden="true"></i>
								) : (
									<i className="fa fa-eye show" aria-hidden="true"></i>
								)}
							</span>
						</div>
						<div className="text-right">
							<Link to="/quen-mat-khau">Quên mật khẩu?</Link>
						</div>
						<div className="container-login-form-btn">
							<div className="wrap-login-form-btn">
								<div className="login-form-bgbtn"></div>
								<button className="login-form-btn" type="submit">
									Đăng nhập
								</button>
							</div>
						</div>
						<div className="txt1">
							<span> Hoặc sử dụng Google </span>
						</div>

						<div className="flex-c-m">
							<div
								className="login-social-item bg3"
								onClick={() => handleLoginGoogle()}
							>
								<i className="fab fa-google"></i>
							</div>
							{/* <div style={{ opacity: '0' }} id="google">
								<GoogleLogin
									onSuccess={credentialResponse => {
										console.log(credentialResponse.credential);
									}}
									onError={() => {
										console.log('error fail');
									}}
								/>
							</div> */}
						</div>

						<div className="flex-col-c">
							<span className="txt1"> Hoặc đăng kí sử dụng </span>

							<Link to="/dang-ki" className="txt2">
								Đăng kí
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
