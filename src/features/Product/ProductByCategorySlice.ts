import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAPI } from '../../Request';
import { IPageByCategory } from '../../utils/TypeScript';
export const getProductByCategory = createAsyncThunk(
	'productByCategories/getProductByCategory',
	async ({ id, search }: { id: string; search: string }, thunkApi) => {
		try {
			let limit = 6;
			let value = search ? search : `?page=${1}`;
			const response = await getAPI(
				`get_product/category/${id}${value}&limit=${limit}`
			);
			const data = { ...response.data, id, search };
			return data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
);
interface IProductByCategoryType {
	loading: boolean;
	error: null | string;
	data: null | IPageByCategory;
}
const initialState = {
	loading: false,
	error: null,
	data: null
} as IProductByCategoryType;
const ProductByCategorySlice = createSlice({
	name: 'productByCategories',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getProductByCategory.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(
				getProductByCategory.fulfilled,
				(state, action: PayloadAction<IPageByCategory>) => {
					state.loading = false;
					state.data = action.payload;
				}
			)
			.addCase(
				getProductByCategory.rejected,
				(state, action: PayloadAction<any>) => {
					state.loading = false;
					state.error = action.payload;
				}
			);
	}
});
export default ProductByCategorySlice.reducer;
