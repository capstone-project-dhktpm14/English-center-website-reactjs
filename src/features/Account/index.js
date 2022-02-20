import { Spin } from "antd";
import meApi from "api/meApi";
import { setLogin, setUser } from "app/globalSlice";
import Footer from "components/Footer";
import Header from "components/Header";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Route, Routes, useLocation } from "react-router-dom";
import ForgotPage from "./pages/ForgotPage";
import LoginPage from "./pages/LoginPage";
import RegistryPage from "./pages/RegistryPage";
import "./style.scss";

Account.propTypes = {};
function Account(props) {
  const { url } = useLocation();
  const dispatch = useDispatch();
  const history = useNavigate();
  const { isLoading } = useSelector((state) => state.account);
  const { user } = useSelector((state) => state.global);
  const [user1, setUser1] = useState();

  useEffect(() => {
    const fetchProfile = async () => {
      setUser1(await meApi.fetchProfile());
    };
    fetchProfile();
  }, []);
  if (user1) {
    dispatch(setLogin(true));
    dispatch(setUser(user1))
    history("/");
  }
  useEffect(() => {
    document.title = "Đăng nhập";
  }, []);

  return (
    <Spin spinning={isLoading}>
      <Header></Header>
      <div id="account_page">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registry" element={<RegistryPage />} />
          <Route path="/forgot" element={<ForgotPage />} />
        </Routes>
      </div>
      <Footer></Footer>
    </Spin>
  );
}

export default Account;
