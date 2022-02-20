import { Card, List } from "antd";
import meApi from "api/meApi";
import Footer from "components/Footer";
import FormCourse from "components/FormCourse";
import Header from "components/Header";
import Slider from "components/Slider";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
//import 'react-quill/dist/quill.snow.css';
import "./style.scss";

function Home(props) {
  const { user } = useSelector((state) => state.global);

  return (
    <div>
      <Header></Header>
      <div className="home-common-page">
        <div class="home-page">
          <div class="home-page-left">
            <div class="slide">
              <Slider />
            </div>
            <div class="toeic-course">toeic course</div>
            <div class="news">news</div>
            <div class="teacher">đại sứ</div>
          </div>
          <div class="home-page-right">
            <div class="link">liên kết nhanh</div>
            <div class="talk">
              <FormCourse />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
