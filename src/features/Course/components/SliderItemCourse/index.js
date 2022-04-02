import React from "react";
import PropTypes from "prop-types";
import "./styleitem.scss";
import {
  AppstoreOutlined,
  CarryOutOutlined,
  FileSearchOutlined,
  FormOutlined,
  PlayCircleOutlined,
  ReadOutlined,
  StarOutlined,
  FieldNumberOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";
import Footer from "components/Footer";

SliderItemCourse.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
  detail: PropTypes.string,
  slug: PropTypes.string,
};

SliderItemCourse.defaultProps = {
  src: "",
  title: "",
  detail: "",
  slug: "",
};

function SliderItemCourse({ src, title, detail, slug, wordNumber }) {
  return (
    <div
      className="carousel-course--item"
      style={{
        background: `linear-gradient(rgba(75, 145, 255, 0.8), gray),url(${src}) no-repeat`,
        backgroundSize: `cover`
      }}
    >
      <div className="course-img">
        <img src={src} alt="" />
      </div>
      <div className="course-content">
        <div className="course-content--title">
          <span>{title}</span>
        </div>
        <div className="course-content-detail">
          <span>{detail}</span>
        </div>{" "}
        <br />
        <div className="course-content-number" style={{ textAlign: "left" }}>
          <FieldNumberOutlined />{" "} Số từ :{" "}
          <span>{wordNumber}</span>
        </div>{" "}
        <br />
        <div className="button">
          <Link to={`/course/${slug}`}>
            <button
              style={{ alignItems: "left", fontSize: "30px" }}
            >
              {" "}
              Play
            </button>
          </Link>
        </div>
      
      </div>
    </div>
    // </div>
  );
}

export default SliderItemCourse;
