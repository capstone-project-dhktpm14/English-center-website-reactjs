import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import routeApi from "api/routeApi";

const KEY = "route";

export const fetchRoutes = createAsyncThunk(
	`${KEY}/fetchBlogs`,
	async (params, thunkApi) => {
		const data = await routeApi.getRoutes(params);
		return data;
	}
);

export const fetchRouteDetail = createAsyncThunk(
	`${KEY}/fetchRouteDetail`,
	async (params, thunkApi) => {
		const { slug } = params;
		const data = await routeApi.getRouteDetail(slug);
		return data;
	}
);

const courseSlice = createSlice({
	name: KEY,
	initialState: {
		isLoading: false,
		routes: {},
		routeDetail: {},
	},
	reducers: {
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},
	},
	extraReducers: {
		// Blogs
		[fetchRoutes.pending]: (state, action) => {
			state.isLoading = true;
		},
		[fetchRoutes.fulfilled]: (state, action) => {
			state.routes = action.payload;
			state.isLoading = false;
		},
		[fetchRoutes.rejected]: (state, action) => {
			state.isLoading = false;
		},

		// Blog detail
		[fetchRouteDetail.pending]: (state, action) => {
			state.isLoading = true;
		},
		[fetchRouteDetail.fulfilled]: (state, action) => {
			state.routeDetail = action.payload;
			state.isLoading = false;
		},
		[fetchRouteDetail.rejected]: (state, action) => {
			state.isLoading = false;
		},
	},
});

const { reducer, actions } = courseSlice;
export const { setLoading } = actions;
export default reducer;
