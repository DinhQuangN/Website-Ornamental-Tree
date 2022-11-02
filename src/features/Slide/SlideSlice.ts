import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteAPI, getAPI, patchAPI, postAPI } from '../../Request';
import { IAccessToken, ISlide } from '../../utils/TypeScript';
export const getSlide = createAsyncThunk(
	'slides/getSlide',
	async (data, thunkApi) => {
		try {
			const response = await getAPI('get_slider');
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
);
export const createSlider = createAsyncThunk(
	'sliders/createSlider',
	async (data: ISlide, thunkApi) => {
		try {
			await postAPI('create_slider', { image: data.image }, data.access_token);
			window.location.href = '/admin/slider';
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
);
export const updateSlider = createAsyncThunk(
	'sliders/updateSlider',
	async (data: ISlide, thunkApi) => {
		try {
			await patchAPI(
				`update_slider/${data.productId}`,
				{ image: data.image },
				data.access_token
			);
			window.location.href = '/admin/slider';
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
);
export const deleteSlider = createAsyncThunk(
	'sliders/deleteSlider',
	async (data: IAccessToken, thunkApi) => {
		try {
			await deleteAPI(`delete_slider/${data.productId}`, data.access_token);
			window.location.href = '/admin/slider';
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
);
interface ISlideType {
	loading: boolean;
	error: null | string;
	data: null | ISlide[];
}
const initialState = {
	loading: false,
	error: null,
	data: null
} as ISlideType;
const slideSlice = createSlice({
	name: 'slides',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getSlide.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getSlide.fulfilled, (state, action: PayloadAction<ISlide[]>) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(getSlide.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false;
				state.error = action.payload;
			});
	}
});
export default slideSlice.reducer;
