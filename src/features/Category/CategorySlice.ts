import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteAPI, getAPI, patchAPI, postAPI } from '../../Request';
import { IAccessToken, ICategory } from '../../utils/TypeScript';

export const getCategory = createAsyncThunk(
	'categories/getCategory',
	async (data, thunkApi) => {
		try {
			const response = await getAPI('get_category');
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
);
export const createCategory = createAsyncThunk(
	'categories/createCategory',
	async (data: ICategory, thunkApi) => {
		try {
			await postAPI('create_category', data, data.access_token);
			window.location.href = '/admin/loai-san-pham';
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
);
export const updateCategory = createAsyncThunk(
	'categories/updateCategory',
	async (data: ICategory, thunkApi) => {
		try {
			await patchAPI(
				`update_category/${data.productId}`,
				data,
				data.access_token
			);
			window.location.href = '/admin/loai-san-pham';
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
);
export const deleteCategory = createAsyncThunk(
	'categories/deleteCategory',
	async (data: IAccessToken, thunkApi) => {
		try {
			await deleteAPI(`delete_category/${data.productId}`, data.access_token);
			window.location.href = '/admin/loai-san-pham';
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
);
interface CategoryType {
	loading: boolean;
	error: null | string;
	data: null | ICategory[];
}
const initialState = {
	loading: false,
	error: null,
	data: null
} as CategoryType;

const categorySlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getCategory.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(
				getCategory.fulfilled,
				(state, action: PayloadAction<ICategory[]>) => {
					state.loading = false;
					state.data = action.payload;
				}
			)
			.addCase(getCategory.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false;
				state.error = action.payload;
			});
	}
});
export default categorySlice.reducer;
