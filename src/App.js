import logo from "./logo.svg";
import Home2 from "./features/Home2";
import Admin from "./features/Admin";
import Account from "./features/Account";
import Class from "./features/Class";
import Course from "./features/Course";
import Blog from "./features/Blog";
import Translate from "./features/Translate";
import Route1 from "./features/Route1";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import { useNavigate } from "react-router";
import "./App.css";
import OnlineExam from "features/OnlineExam";
import WordNote from "features/WordNote";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUserProfile } from "app/globalSlice";
import meApi from "api/meApi";
import { unwrapResult } from "@reduxjs/toolkit";
import PerPart from "features/PerPart";

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
          <Route path="translate/*" element={<Translate />} />
          <Route path="routes/*" element={<Route1 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
