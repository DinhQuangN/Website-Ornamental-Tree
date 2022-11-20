import { configureStore } from '@reduxjs/toolkit';
import AccessorySlice from './Accessory/AccessorySlice';
import AuthSlice from './Auth/AuthSlice';
import CartSlice from './Cart/CartSlice';
import CategorySlice from './Category/CategorySlice';
import ProductByCategorySlice from './Product/ProductByCategorySlice';
import ProductSlice from './Product/ProductSlice';
import productsSlice from './Product/productsSlice';
import SlideSlice from './Slide/SlideSlice';
const store = configureStore({
	reducer: {
		category: CategorySlice,
		product: ProductSlice,
		auth: AuthSlice,
		slide: SlideSlice,
		accessory: AccessorySlice,
		productByCategory: ProductByCategorySlice,
		cart: CartSlice,
		products: productsSlice
	},
	devTools: false
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
