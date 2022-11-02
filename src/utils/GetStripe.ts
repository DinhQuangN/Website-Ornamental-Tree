import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
	if (!stripePromise) {
		stripePromise = loadStripe(process.env.REACT_APP_PUBLIC_KEY!);
	}
	return stripePromise;
};
export default getStripe;
