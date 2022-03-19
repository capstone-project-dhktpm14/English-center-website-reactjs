import routeAdminApi from "api/routeAdminApi";
import { routeValues } from "./initialAndValidateValues";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const KEY = "route";

export const fetchRoutes = createAsyncThunk(
  `${KEY}/fetchRoutes`,
  async (params, thunk) => {
    const data = await routeAdminApi.fetchRoute();
    return data;
  }
);

export const deleteRoute = createAsyncThunk(
  `${KEY}/deleteRoute`,
  async (params, thunk) => {
    const { routeId } = params;
    const data = await routeAdminApi.deleteRoute(routeId);
    return routeId;
  }
);

const routeSlice = createSlice({
  name: KEY,
  initialState: {
    isLoading: false,
    isRouteFormVisible: false,
    routes: [],
    selectedRoute: routeValues.initial,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setRouteFormVisible: (state, action) => {
      state.isRouteFormVisible = action.payload;
    },
    setRoutes: (state, action) => {
      state.routes = action.payload;
    },

    addRoute: (state, action) => {
      state.routes.push(action.payload);
    },
    setRouteUpdate: (state, action) => {
      state.selectedRoute = action.payload;
    },
    setRouteDefault: (state, action) => {
      state.selectedRoute = routeValues.initial;
    },
  },
  extraReducers: {
    [fetchRoutes.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [fetchRoutes.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchRoutes.fulfilled]: (state, action) => {
      state.routes = action.payload;
      state.isLoading = false;
      
    },
    [deleteRoute.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteRoute.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.routes = action.payload;
      // state.routes = state.routes.filter(
      //   (route) => route.id !== action.payload
      // );
    },
    [deleteRoute.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

const { reducer, actions } = routeSlice;
export const {
  setLoading,
  setRouteDefault,
  setRouteUpdate,
  addRoute,
  setRoutes,
  setRouteFormVisible,
} = actions;
export default reducer;
