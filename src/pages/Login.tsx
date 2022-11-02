import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signIn } from '../features/Auth/AuthSlice';
import { useAppDispatch, useAppSelector } from '../hooks/useTypedSelector';
import { FormSubmit, InputChange } from '../utils/TypeScript';

const Login: React.FC = () => {
	const [user, setUser] = useState({ account: '', password: '' });
	const [typePass, setTypePass] = useState<boolean>(false);
	const { auth } = useAppSelector(state => state);
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
	return (
		<div className="limiter">
			<div className="containe">
				<div className="wrap-login">
					<form className="login-form validate-form" onSubmit={handleSubmit}>
						<span className="login-form-title">Login</span>
						<div
							className="wrap-input validate-input"
							data-validate="Username is reauired"
						>
							<span className="label-input">Username</span>
							<input
								className="input"
								type="text"
								name="account"
								value={account}
								onChange={handleChangeInput}
								placeholder="Type your username"
							/>
							<span className="focus-input" data-symbol="&#xf206;"></span>
						</div>
						<div
							className="wrap-input validate-input"
							data-validate="Password is reauired"
						>
							<span className="label-input">Password</span>
							<input
								className="input"
								type={typePass ? 'text' : 'password'}
								name="password"
								value={password}
								onChange={handleChangeInput}
								placeholder="Type your password"
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
							<Link to="#">Forgot password?</Link>
						</div>
						<div className="container-login-form-btn">
							<div className="wrap-login-form-btn">
								<div className="login-form-bgbtn"></div>
								<button className="login-form-btn" type="submit">
									Login
								</button>
							</div>
						</div>
						<div className="txt1">
							<span> Or Sign Up Using </span>
						</div>

						<div className="flex-c-m">
							<Link to="#" className="login-social-item bg1">
								<i className="fab fa-facebook"></i>
							</Link>

							<Link to="#" className="login-social-item bg3">
								<i className="fab fa-google"></i>
							</Link>
						</div>

						<div className="flex-col-c">
							<span className="txt1"> Or Sign Up Using </span>

							<Link to="/dang-ki" className="txt2">
								Sign Up
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
