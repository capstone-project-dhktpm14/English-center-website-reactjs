import { Spin } from "antd";
import Header from "components/Header";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Route, Routes, useLocation } from "react-router-dom";
import './style.scss';

function Account(props) {
  useEffect(() => {
    document.title = "GIáo viên";
  }, []);

  return (
    <div>
      <Header></Header>
      <div className="teacher_page">teacher</div>
    </div>
  );
}

export default Account;
