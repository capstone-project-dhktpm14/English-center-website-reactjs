import { Spin } from "antd";
import Header from "components/Header";
import NotFoundPage from "components/NotFoundPage";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Route, Routes, useLocation } from "react-router-dom";
import MainPage from "./pages/MainPage";

import './style.scss';

function Traslate(props) {
  return (
    <div>
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  </div>
  );
}

export default Traslate;
