import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAPI, postAPI } from '../../Request';
import { IProduct } from '../../utils/TypeScript';
export const getProduct = createAsyncThunk(
	'products/getProduct',
	async (data, thunkApi) => {
		try {
			const response = await getAPI('get_product');
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
);
export const createProduct = createAsyncThunk(
	'products/createProduct',
	async (data: IProduct, thunkApi) => {
		try {
			await postAPI('create_product', data, data.access_token);
			window.location.href = '/admin/san-pham';
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
);
interface ProductType {
	loading: boolean;
	error: null | string;
	data: null | IProduct[];
}
const initialState = {
	loading: false,
	error: null,
	data: null
} as ProductType;
const productSlide = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getProduct.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(
				getProduct.fulfilled,
				(state, action: PayloadAction<IProduct[]>) => {
					state.loading = false;
					state.data = action.payload;
				}
			)
			.addCase(getProduct.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false;
				state.error = action.payload;
			});
	}
});
export default productSlide.reducer;
