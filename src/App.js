import logo from "./logo.svg";
import Home from "./features/Home";
import Admin from "./features/Admin";
import Account from "./features/Account";
import Teacher from "./features/Teacher";
import Course from "./features/Course";
import Blog from "./features/Blog";
import Translate from "./features/Translate";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import { useNavigate } from "react-router";
import "./App.css";
import OnlineExam from "features/OnlineExam";
import WordNote from "features/WordNote";
import UserPage from "./features/Admin/pages/UserPage";
import MainPage from "features/Translate/pages/MainPage";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUserProfile } from "app/globalSlice";
import meApi from "api/meApi";
import { unwrapResult } from "@reduxjs/toolkit";

function App() {
  const dispatch = useDispatch();
  const [isFetch, setIsFetch] = useState(false);
  //const history = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (token) await meApi.fetchProfile();
      setIsFetch(true);
      // ----------------
      const { roles } = unwrapResult(await dispatch(fetchUserProfile()));
      console.log("role" + roles);
      const index = roles.findIndex((roleEle) => roleEle === "ROLE_USER");

      // if (index !== -1) {
      //   history("/");
      // } else {
      //   history("/admin");
      // }
    };
    fetchProfile();
  }, []);
  if (!isFetch) return "";
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="account/*" element={<Account />} />
          <Route path="admin/*" element={<Admin />} />
          <Route path="course/*" element={<Course />} />
          <Route path="wordnote/*" element={<WordNote />} />
          <Route path="teacher/" element={<Teacher />} />
          <Route path="test/" element={<OnlineExam />} />
          <Route path="aboutme/" element={<Blog />} />
          <Route path="translate/*" element={<Translate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
