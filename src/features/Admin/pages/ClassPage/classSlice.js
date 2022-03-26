import classAdminApi from "api/classAdminApi";
import { useLocation, useParams } from "react-router";
import { classValues, scheduleValues } from "./initialAndValidateValues";

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

//schedule
export const fetchSchedules = createAsyncThunk(
  `${KEY}/fetchSchedules`,
  async (params, thunkApi) => {
    const location = useLocation();
    //console.log("JSon sl " + location.pathname.slice(15, 16));
    const data = await classAdminApi.fetchSchedules(params, 6);
    return data;
  }
);

export const deleteSchedule = createAsyncThunk(
  "deleteSchedule",
  async (params, thunk) => {
    const { scheduleId } = params;
    const data = await classAdminApi.deleteSchedule(scheduleId);
    return scheduleId;
  }
);

const classSlice = createSlice({
  name: KEY,
  initialState: {
    isLoading: false,
    isClassFormVisible: false,
    classes: [],
    schedulesPage: {},
    selectedClass: classValues.initial,
    selectedSchedule: scheduleValues.initial,
  },
  reducers: {
    //class
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setClassFormVisible: (state, action) => {
      state.isClassFormVisible = action.payload;
    },
    setClasses: (state, action) => {
      state.classes = action.payload;
    },
    // setSchdules: (state, action) => {
    //   state.sch = action.payload;
    // },

    addClass: (state, action) => {
      state.classes.push(action.payload);
    },
    setClassUpdate: (state, action) => {
      state.selectedClass = action.payload;
    },
    setClassDefault: (state, action) => {
      state.selectedClass = classValues.initial;
    },
    //schedule
    addSchedule: (state, action) => {
      state.schedulesPage.data.push(action.payload);
    },
    setScheduleUpdate: (state, action) => {
      state.selectedSchedule = action.payload;
    },
    setScheduleDefault: (state, action) => {
      state.selectedSchedule = classValues.initial;
    },
    setSchedules: (state, action) => {
      state.schedulesPage = action.payload;
    },
  },
  extraReducers: {
    //class

    
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

    //schedule
    [fetchSchedules.pending]: (state, action) => {
      state.isLoading = true;
    },

    [fetchSchedules.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.schedulesPage = action.payload;
    },
    [fetchSchedules.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [deleteSchedule.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteSchedule.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.classes = action.payload;
    },
    [deleteSchedule.rejected]: (state, action) => {
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
  setSchedules,
  addSchedule,
  setScheduleDefault,
  setScheduleUpdate,
  setClassFormVisible,
} = actions;
export default reducer;
