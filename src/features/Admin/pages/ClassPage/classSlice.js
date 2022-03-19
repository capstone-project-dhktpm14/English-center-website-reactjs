
import classAdminApi from "api/classAdminApi";
import { classValues } from "./initialAndValidateValues";


const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const KEY = "classes";

export const fetchClasses = createAsyncThunk(
  "fetchClasses",
  async (params, thunk) => {
    const data = await classAdminApi.fetchClass();
    return data;
  }
);

export const deleteClass = createAsyncThunk(
  "deleteClass",
  async (params, thunk) => {
    const { classId } = params;
    const data = await classAdminApi.deleteRoute(classId);
    return classId;
  }
);

const classSlice = createSlice({
  name: KEY,
  initialState: {
    isLoading: false,
    isClassFormVisible: false,
    classes: [],
    selectedClass: classValues.initial,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setClassFormVisible: (state, action) => {
      state.isClassFormVisible = action.payload;
    },
    setClasses: (state, action) => {
      state.routes = action.payload;
    },

    addClass: (state, action) => {
      state.classes.push(action.payload);
    },
    setClassUpdate: (state, action) => {
      state.selectedClass = action.payload;
    },
    setClassDefault: (state, action) => {
      state.selectedClass = classValues.initial;
    },
  },
  extraReducers: {
    [fetchClasses.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [fetchClasses.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchClasses.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.classes = action.payload;
    },
    [deleteClass.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteClass.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.classes = action.payload;
    },
    [deleteClass.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

const { reducer, actions } = classSlice;
export const {
  setLoading,
  setClassDefault,
  setClassUpdate,
  addClass,
  setClasses,
  setClassFormVisible,
} = actions;
export default reducer;
