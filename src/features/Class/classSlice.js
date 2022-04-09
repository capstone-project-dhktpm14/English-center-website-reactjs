import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import classApi from 'api/classApi';

const KEY = 'classes';

export const fetchClasses = createAsyncThunk(
  'fetchClasses',
  async (params, thunkApi) => {
    console.log('api', +params);
    const data = await classApi.fetchClass(params);
    return data;
  }
);
export const deleteClass = createAsyncThunk(
  'deleteClass',
  async (params, thunk) => {
    const { classesId } = params;
    const data = await classApi.cancelSchedule(classesId, 'CANCEL');
    return classesId;
  }
);

const classSlice = createSlice({
  name: KEY,
  initialState: {
    isLoading: false,
    classes: {},
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: {
    // Class
    [fetchClasses.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchClasses.fulfilled]: (state, action) => {
      state.classes = action.payload;
      state.isLoading = false;
    },
    [fetchClasses.rejected]: (state, action) => {
      state.isLoading = false;
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
export const { setLoading } = actions;
export default reducer;
