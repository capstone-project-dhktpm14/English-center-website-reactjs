import { Spin } from "antd";
import Header from "components/Header";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Route, Routes, useLocation } from "react-router-dom";

//import './style.scss';

function OnlineExam(props) {
  const { url } = useLocation();
  useEffect(() => {
    document.title = "Online Exam";
  }, []);

  return (
    <div>
      <Header></Header>
      <div id="account_page">test online</div>
    </div>
  );
}

export default OnlineExam;
