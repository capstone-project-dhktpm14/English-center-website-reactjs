import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import {
  AppstoreOutlined,
  CarryOutOutlined,
  FileSearchOutlined,
  FormOutlined,
  PlayCircleOutlined,
  ReadOutlined,
  StarOutlined,
} from "@ant-design/icons";

SliderItem.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
  detail: PropTypes.string,
};

SliderItem.defaultProps = {
  src: "",
  title: "",
  detail: "",
};

function SliderItem({ src, title, detail }) {
  return (
    <div className="carousel-slider--item">
      <div className="slider-img">
        <img src={src} alt="" />
      </div>
      <div className="slider-content">
        <div className="slider-content--title">
          <span>{title}</span>
        </div>
        <div className="slider-content-detail">
          <span>{detail}</span>
        </div>
        <div className="starts">
          <StarOutlined />
          <StarOutlined />
          <StarOutlined />
          <StarOutlined />
          <StarOutlined />
        </div>
      </div>
    </div>
  );
}

export default SliderItem;
