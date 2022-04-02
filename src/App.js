import { unwrapResult } from '@reduxjs/toolkit';
import meApi from 'api/meApi';
import { fetchUserProfile } from 'app/globalSlice';
import OnlineExam from 'features/OnlineExam';
import PerPart from 'features/PerPart';
import WordNote from 'features/WordNote';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//import { useNavigate } from "react-router";
import './App.css';
import Account from './features/Account';
import Admin from './features/Admin';
import Blog from './features/Blog';
import Class from './features/Class';
import Course from './features/Course';
import Home2 from './features/Home2';
import Route1 from './features/Route1';

function App() {
  const dispatch = useDispatch();
  const [isFetch, setIsFetch] = useState(false);
  //const history = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        await meApi.fetchProfile();
      }
      setIsFetch(true);
      // ----------------
      const { roles } = unwrapResult(await dispatch(fetchUserProfile()));
      console.log('role' + roles);
      const index = roles.findIndex((roleEle) => roleEle === 'ROLE_USER');

      // if (index !== -1) {
      //   history("/");
      // } else {
      //   history("/admin");
      // }
    };
    fetchProfile();
  }, []);
  if (!isFetch) {
    return '';
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Home2 />} />
          <Route path="account/*" element={<Account />} />
          <Route path="admin/*" element={<Admin />} />
          <Route path="course/*" element={<Course />} />
          <Route path="wordnote/*" element={<WordNote />} />
          <Route path="classes/" element={<Class />} />
          <Route path="exams/*" element={<OnlineExam />} />
          <Route path="parts/*" element={<PerPart />} />
          <Route path="aboutme/" element={<Blog />} />
          <Route path="routes/*" element={<Route1 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
