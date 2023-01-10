import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signUp } from '../features/Auth/AuthSlice';
import { useAppDispatch } from '../hooks/useTypedSelector';
import { FormSubmit, InputChange, IRegisterUser } from '../utils/TypeScript';
import { checkInput } from '../utils/Valid';

const Register: React.FC = () => {
	const [user, setUser] = React.useState<IRegisterUser>({
		firstName: '',
		lastName: '',
		confirmPassword: '',
		account: '',
		password: ''
	});
	const [typePass, setTypePass] = React.useState<boolean>(false);
	const [typeCfPass, setCfTypePass] = React.useState<boolean>(false);
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
			<title>Đăng kí</title>;
			<div className="containe">
				<div className="wrap-login">
					<form className="login-form validate-form" onSubmit={handleSubmit}>
						<span className="login-form-title">Đăng kí</span>
						<div
							className="wrap-input validate-input"
							data-validate="Username is reauired"
						>
							<span className="label-input">Họ</span>
							<input
								className="input"
								type="text"
								name="firstName"
								value={firstName}
								onChange={handleChangeInput}
								placeholder="Nhập họ của bạn"
							/>
							<span className="focus-input" data-symbol="&#xf206;"></span>
						</div>
						<div
							className="wrap-input validate-input"
							data-validate="Username is reauired"
						>
							<span className="label-input">Tên</span>
							<input
								className="input"
								type="text"
								name="lastName"
								value={lastName}
								onChange={handleChangeInput}
								placeholder="Nhập tên của bạn"
							/>
							<span className="focus-input" data-symbol="&#xf206;"></span>
						</div>
						<div
							className="wrap-input validate-input"
							data-validate="Username is reauired"
						>
							<span className="label-input">Tài khoản</span>
							<input
								className="input"
								type="email"
								name="account"
								value={account}
								onChange={handleChangeInput}
								placeholder="Nhập email của bạn"
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
								placeholder="Nhập mật khẩu của bạn"
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
							<span className="label-input">Nhập lại mật khẩu</span>
							<input
								className="input"
								type={typeCfPass ? 'text' : 'password'}
								name="confirmPassword"
								value={confirmPassword}
								onChange={handleChangeInput}
								placeholder="Nhập lại mật khẩu của bạn"
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
									Đăng kí
								</button>
							</div>
						</div>
						<div className="flex-col-c">
							<span className="txt1"> Bạn đã có tài khoản? </span>

							<Link to="/dang-nhap" className="txt2">
								Đăng nhập
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
