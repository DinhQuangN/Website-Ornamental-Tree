import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteAPI, getAPI, patchAPI } from '../../Request';
import {
	IAccessToken,
	IPageByCategory,
	IProduct
} from '../../utils/TypeScript';

export const getProducts = createAsyncThunk(
	'products/getProducts',
	async (search: string, thunkApi) => {
		try {
			let limit = 5;
			let value = search ? search : `?page=${1}`;
			const response = await getAPI(`get_products/${value}$limit=${limit}`);
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
);
export const updateProducts = createAsyncThunk(
	'products/updateProducts',
	async (data: IProduct, thunkApi) => {
		try {
			await patchAPI(
				`update_product/${data.productId}`,
				data,
				data.access_token
			);
			window.location.href = '/admin/san-pham';
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
);
export const deleteProducts = createAsyncThunk(
	'products/deleteProducts',
	async (data: IAccessToken, thunkApi) => {
		try {
			await deleteAPI(`delete_product/${data.productId}`, data.access_token);
			window.location.href = '/admin/san-pham';
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
);
interface IProductsType {
	loading: boolean;
	error: null | string;
	data: null | IPageByCategory;
}
const initialState = {
	loading: false,
	error: null,
	data: null
} as IProductsType;
const ProductsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getProducts.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(
				getProducts.fulfilled,
				(state, action: PayloadAction<IPageByCategory>) => {
					state.loading = false;
					state.data = action.payload;
				}
			)
			.addCase(getProducts.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false;
				state.error = action.payload;
			});
	}
});
export default ProductsSlice.reducer;
