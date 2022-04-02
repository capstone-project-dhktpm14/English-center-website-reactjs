import { configureStore } from '@reduxjs/toolkit';
import global from './globalSlice';
import account from 'features/Account/accountSlice';
import admin from 'features/Admin/adminSlice';
import course from 'features/Admin/pages/CoursePage/courseSlice';
import courseClient from 'features/Course/CourseSlice';
import user from 'features/Admin/pages/UserPage/userSlice';
import wordnote from 'features/WordNote/wordNoteSlice';
import book from 'features/Admin/pages/Book/bookSlice';
import exam from 'features/Admin/pages/Exam/examSlice';
import onlineExam from 'features/OnlineExam/onlineExamSlice';
import perPart from 'features/PerPart/perPartSlice';
import route from 'features/Admin/pages/RoutePage/routeSlice';
import routeClient from 'features/Route1/routeSlice';
import classes from 'features/Admin/pages/ClassPage/classSlice';
import classClient from 'features/Class/classSlice';

const rootReducer = {
  global,
  account,
  admin,
  course,
  courseClient,
  user,
  wordnote,
  book,
  exam,
  onlineExam,
  perPart,
  route,
  routeClient,
  classes,
  classClient,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
