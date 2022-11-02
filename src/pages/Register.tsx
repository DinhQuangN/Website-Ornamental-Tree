import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signUp } from '../features/Auth/AuthSlice';
import { useAppDispatch } from '../hooks/useTypedSelector';
import { FormSubmit, InputChange, IRegisterUser } from '../utils/TypeScript';
import { checkInput } from '../utils/Valid';

const Register: React.FC = () => {
	const [user, setUser] = useState<IRegisterUser>({
		firstName: '',
		lastName: '',
		confirmPassword: '',
		account: '',
		password: ''
	});
	const [typePass, setTypePass] = useState<boolean>(false);
	const [typeCfPass, setCfTypePass] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const { account, password, firstName, lastName, confirmPassword } = user;
	const handleChangeInput = (e: InputChange) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};
	const handleSubmit = (e: FormSubmit) => {
		e.preventDefault();
		const check = checkInput(user);
		toast.error(check);
		if (!check) dispatch(signUp(user));
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
							<span className="label-input">First Name</span>
							<input
								className="input"
								type="text"
								name="firstName"
								value={firstName}
								onChange={handleChangeInput}
								placeholder="Type your first name"
							/>
							<span className="focus-input" data-symbol="&#xf206;"></span>
						</div>
						<div
							className="wrap-input validate-input"
							data-validate="Username is reauired"
						>
							<span className="label-input">LastName</span>
							<input
								className="input"
								type="text"
								name="lastName"
								value={lastName}
								onChange={handleChangeInput}
								placeholder="Type your last name"
							/>
							<span className="focus-input" data-symbol="&#xf206;"></span>
						</div>
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
								placeholder="abc@gmail.com Or +84123456789"
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
						<div
							className="wrap-input validate-input"
							data-validate="Password is reauired"
						>
							<span className="label-input">ConfirmPassword</span>
							<input
								className="input"
								type={typeCfPass ? 'text' : 'password'}
								name="confirmPassword"
								value={confirmPassword}
								onChange={handleChangeInput}
								placeholder="Type your confirm password"
							/>
							<span className="focus-input" data-symbol="&#xf190;"></span>
							<span onClick={() => setCfTypePass(!typeCfPass)}>
								{typeCfPass ? (
									<i className="fa fa-eye-slash show" aria-hidden="true"></i>
								) : (
									<i className="fa fa-eye show" aria-hidden="true"></i>
								)}
							</span>
						</div>
						<div className="container-login-form-btn">
							<div className="wrap-login-form-btn">
								<div className="login-form-bgbtn"></div>
								<button className="login-form-btn" type="submit">
									Register
								</button>
							</div>
						</div>
						<div className="flex-col-c">
							<span className="txt1"> Already Have An Account </span>

							<Link to="/dang-nhap" className="txt2">
								Sign In
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
