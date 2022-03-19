import React from "react";
import PropTypes from "prop-types";
import { Routes, Route, useRouteMatch } from "react-router-dom";
import { Spin } from "antd";

import NotFoundPage from "components/NotFoundPage";
import { useSelector } from "react-redux";
import MainPage from "./pages/MainPage";
import TestPage from "./pages/TestPage";
import FinishPage from "./pages/FinishPage";
import Header from "components/Header";
import Footer from "components/Footer";


PerPart.propTypes = {};

function PerPart(props) {
  const { isLoading } = useSelector((state) => state.perPart);

  return (
    <Spin spinning={isLoading}>
      <div>
        <Header></Header>
        <Routes>
          <Route path="/:numberPart" element={<MainPage />} />
          <Route path="/test/:examSlug/:numberPart" element={<TestPage />} />
          <Route
            path="/test/:examSlug/:numberPart/finish"
            element={<FinishPage />}
          />
          <Route element={<NotFoundPage />} />
        </Routes>
        <Footer></Footer>
      </div>
    </Spin>
  );
}

export default PerPart;
