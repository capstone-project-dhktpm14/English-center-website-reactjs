import Footer from "components/Footer";
import Header from "components/Header";
import NotFoundPage from "components/NotFoundPage";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useRouteMatch } from "react-router-dom";
import { fetchBooks } from "./onlineExamSlice";
import CheckInExam from "./pages/CheckInExam";
import Checkout from "./pages/Checkout";
import Examining from "./pages/Examining";
import MainPage from "./pages/MainPage";
import ResultPage from "./pages/ResultPage";
import "./style.scss";

OnlineExam.propTypes = {};

function OnlineExam(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, []);

  return (
    <div className="exam_main">
      {/* <Header></Header> */}
      <Routes>
        <Route path="/:testId/checkin" element={<CheckInExam />} />
        <Route path="/:testId/examining" element={<Examining />} />
        <Route path="/:testId/checkout" element={<Checkout />} />
        <Route path="/:testId/result" element={<ResultPage />} />
        <Route exact path="/" element={<MainPage />} />
        <Route element={<NotFoundPage />} />
      </Routes>
      {/* <Footer></Footer> */}
    </div>
  );
}

export default OnlineExam;
