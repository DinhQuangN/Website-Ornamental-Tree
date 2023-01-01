import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { postAPI } from '../../Request';
import { FormSubmit, ICheckOut, InputChange } from '../../utils/TypeScript';
import { checkOrder, vnd } from '../../utils/Valid';

const CARD_OPTIONS = {
	style: {
		base: {
			color: '#000',
			fontSize: '20px',
			iconColor: '#000',
			'::placeholder': {
				color: '#000'
			}
		},
		invalid: {
			iconColor: '#ff0505',
			color: '#ff0505'
		},
		complete: {
			iconColor: '#000'
		}
	}
};
interface IProps {
	setOpen: (value: boolean) => void;
	totalMoney: number;
}
const CheckOut: React.FC<IProps> = ({ setOpen, totalMoney }) => {
	const initialState = {
		describe: '',
		name: '',
		address: '',
		email: ''
	};
	const [stripeToken, setStripeToken] = React.useState<string | undefined>();
	const [data, setData] = React.useState<ICheckOut>(initialState);
	const { auth, cart } = useAppSelector(state => state);
	const { name, describe, address, email } = data;
	const handleOnChange = (e: InputChange) => {
		const { name, value } = e.target;
		setData({ ...data, [name]: value });
	};
	const stripe = useStripe();
	const elements = useElements();
	const check = checkOrder(data);
	const handleSubmit = async (e: FormSubmit) => {
		e.preventDefault();
		if (elements == null) return;
		if (stripe == null) return;
		const cardElement = elements.getElement(CardElement);
		if (cardElement) {
			const { error, paymentMethod } = await stripe.createPaymentMethod({
				type: 'card',
				card: cardElement
			});
			if (!error) {
				try {
					if (check) return toast.error(check);
					const { id } = paymentMethod;
					setStripeToken(id);
				} catch (error: any) {
					toast.error(error);
				}
			} else {
				toast.error(error.message);
			}
		}
	};

	React.useEffect(() => {
		const makeRequest = async () => {
			try {
				await postAPI('payment', {
					tokenId: stripeToken,
					totalMoney: totalMoney,
					describe,
					name
				});
			} catch (error: any) {
				toast.error(error.message);
			}
		};
		stripeToken && makeRequest();
		setStripeToken('');
		setOpen(false);
	}, [stripeToken, totalMoney]);
	React.useEffect(() => {
		stripeToken &&
			setTimeout(async () => {
				await postAPI(
					'createOrder',
					{
						name,
						products: cart,
						describe,
						totalMoney,
						address,
						email
					},
					auth.data?.access_token
				);
				window.location.href = '/success';
			}, 2500);
	}, [stripeToken]);
	return (
		<form className="check_out-form" onSubmit={handleSubmit}>
			<fieldset className="check_out-form-group">
				<div className="check_out-form-row">
					<label htmlFor="check_out-form-label">Thanh toán</label>
					<i className="fas fa-times" onClick={() => setOpen(false)}></i>
				</div>
				<CardElement options={CARD_OPTIONS} />
				<div className="check_out-form-column">
					<input
						type="text"
						placeholder="Họ và tên"
						name="name"
						value={name}
						onChange={handleOnChange}
					/>
					<input
						type="text"
						placeholder="Số điện thoại"
						name="email"
						value={email}
						onChange={handleOnChange}
					/>
					<input
						type="text"
						placeholder="Địa chỉ"
						name="address"
						value={address}
						onChange={handleOnChange}
					/>
					<input
						type="text"
						placeholder="Mô tả"
						name="describe"
						value={describe}
						onChange={handleOnChange}
					/>
				</div>
			</fieldset>
			<button type="submit" disabled={!stripe || !elements}>
				Pay {vnd(totalMoney)} đ
			</button>
		</form>
	);
};

export default CheckOut;
