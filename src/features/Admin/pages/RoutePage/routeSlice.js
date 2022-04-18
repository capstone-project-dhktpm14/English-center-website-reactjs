import routeAdminApi from 'api/admin/routeAdminApi';
import { routeValues } from './initialAndValidateValues';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
const KEY = 'route';


// Hàm này
export const fetchRoutes = createAsyncThunk(
  `${KEY}/fetchRoutes`,
  async (params, thunk) => {
    const data = await routeAdminApi.fetchRoute();
    // Get dữ liệu thàhg côg thì sẽ return data
    // hàm fullfiled ở dưới sẽ nhận data thông qua action.payload
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

    // Chỗ này là xử lý làm gì đó khi get dữ liệu bị lỗi
    // Khi get dữ liệu không thành công thì nó sẽ chạy chỗ này
    // Thường chỗ này t ko làm gì, chỉ tắt cái vogf tròn loading thôi
    [fetchRoutes.rejected]: (state, action) => {
      state.isLoading = false;
    },

    // Chỗ này là xử lý làm gì đó trước khi get dữ liệu
    // Thường trước khi get dữ liệu t sẽ cho 1 state là loaing để mà hình hiển thị cái vòng loading trên UI
    [fetchRoutes.pending]: (state, action) => {
      state.isLoading = true;
    },

    // Chỗ này là xử lý làm gì đó khi get dữ liệu thàh công
    // Chỗ này là khi get thành công, mình sẽ xử lỹ ữ liệu ở đây
    // t sẽ xử lý dữ liẹu tuỳ theo tình huống
    // Hoặc chỉ lưu và state thôi cũng dc

    [fetchRoutes.fulfilled]: (state, action) => {

      // action.payload là dữ liệu mà cái hàm fetch ở trên trả về khi get thành công

      // console.log('fetchRoutes.fulfilled: ',action.payload);

      // Lưu dữ liệu vào store
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
