import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../utils/TypeScript';
export interface ICartType extends IProduct {
	quantity: number;
}
export interface IUpdateQuantityType {
	id: string;
	quantity: number;
}
export interface IDeleteType {
	id: string;
}
const handleSetUp = () => {
	const data = sessionStorage.getItem('carts');
	if (data) {
		return JSON.parse(data) as ICartType[];
	}
	return [] as ICartType[];
};
const CartSlice = createSlice({
	name: 'carts',
	initialState: handleSetUp(),
	reducers: {
		addCart: (state, action: PayloadAction<ICartType>) => {
			const itemIndex = state.findIndex(p => p._id === action.payload._id);
			if (itemIndex >= 0) {
				state[itemIndex].quantity += action.payload.quantity;
			} else {
				state.push(action.payload);
			}
			sessionStorage.setItem('carts', JSON.stringify(state));
			return state;
		},
		updateQuantityCart: (state, action: PayloadAction<IUpdateQuantityType>) => {
			const itemId = state.findIndex(p => p._id === action.payload.id);
			if (itemId >= 0) state[itemId].quantity = action.payload.quantity;
			sessionStorage.setItem('carts', JSON.stringify(state));
			return state;
		},
		deleteCart: (state, action: PayloadAction<IDeleteType>) => {
			const itemId = state.filter(p => p._id !== action.payload.id);
			sessionStorage.setItem('carts', JSON.stringify(itemId));
			return itemId;
		}
	}
});
export default CartSlice.reducer;
export const { addCart, updateQuantityCart, deleteCart } = CartSlice.actions;
