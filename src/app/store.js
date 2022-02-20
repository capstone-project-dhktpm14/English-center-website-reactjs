import { configureStore } from "@reduxjs/toolkit";
import global from "./globalSlice";
import account from "features/Account/accountSlice";
import admin from "features/Admin/adminSlice";
import home from "features/Home/homeSlice";
import course from "features/Admin/pages/CoursePage/courseSlice"
import courseClient from "features/Course/CourseSlice"
import user from "features/Admin/pages/UserPage/userSlice"
import wordnote from "features/WordNote/wordNoteSlice"

const rootReducer = {
  global,
  account,
  admin,
  home,
  course,
  courseClient,
  user,
  wordnote,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
