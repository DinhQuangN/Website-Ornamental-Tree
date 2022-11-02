import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteAPI, getAPI, patchAPI, postAPI } from '../../Request';
import { IAccessory, IAccessToken, IPage } from '../../utils/TypeScript';
export const getAccessory = createAsyncThunk(
	'accessories/getAccessory',
	async (search: string, thunkApi) => {
		try {
			let limit = 6;
			let value = search ? search : `?page==${1}`;
			const response = await getAPI(`accessory${value}&limit=${limit}`);
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
);
export const createAccessory = createAsyncThunk(
	'accessories/createAccessory',
	async (data: IAccessory, thunkApi) => {
		try {
			await postAPI('create_accessory', data, data.access_token);
			window.location.href = '/admin/phu-kien-san-pham';
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
);
export const updateAccessory = createAsyncThunk(
	'accessories/updateAccessory',
	async (data: IAccessory, thunkApi) => {
		try {
			await patchAPI(
				`update_accessory/${data.productId}`,
				data,
				data.access_token
			);
			window.location.href = '/admin/phu-kien-san-pham';
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
);
export const deleteAccessory = createAsyncThunk(
	'accessories/deleteAccessory',
	async (data: IAccessToken, thunkApi) => {
		try {
			await deleteAPI(`delete_accessory/${data.productId}`, data.access_token);
			window.location.href = '/admin/phu-kien-san-pham';
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
);
export const searchAccessory = createAsyncThunk(
	'accessories/searchAccessory',
	async (data: string, thunkApi) => {
		try {
			const response = await getAPI(`search_accessory?search=${data}`);
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
);
interface IAccessoryType {
	loading: boolean;
	error: null | string;
	data: null | undefined | IPage;
}
const initialState = {
	loading: false,
	error: null,
	data: null
} as IAccessoryType;
const accessorySlice = createSlice({
	name: 'accessories',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getAccessory.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(
				getAccessory.fulfilled,
				(state, action: PayloadAction<IPage>) => {
					state.loading = false;
					state.data = action.payload;
				}
			)
			.addCase(getAccessory.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(searchAccessory.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(
				searchAccessory.fulfilled,
				(state, action: PayloadAction<IPage>) => {
					state.loading = false;
					state.data = action.payload;
				}
			)
			.addCase(
				searchAccessory.rejected,
				(state, action: PayloadAction<any>) => {
					state.loading = false;
					state.error = action.payload;
				}
			);
	}
});
export default accessorySlice.reducer;
