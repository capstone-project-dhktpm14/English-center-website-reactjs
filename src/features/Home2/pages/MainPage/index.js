import {
  AppstoreOutlined,
  PlayCircleOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import { Carousel, Divider } from "antd";
import AboutImage from "assets/image/about-main-page.svg";
import BackToTopButton from "components/BackToTopButton";

import FormCourse from "components/FormCourse";
import Header from "components/Header";
import SliderItem from "features/Home2/components/SliderItem";

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
MainPage.propTypes = {};

function MainPage(props) {
  useEffect(() => {
    document.title = "Trang chủ";
  }, []);
  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  const data = [
    {
      image:
        "https://www.anhngumshoa.com/uploads/images/resize/750x750/slide/web.jpg",
      title: "Nguyễn Trần Nhật Hào",
      detail:
        "Mình rất thích phần mềm, nó giúp mình học tốt hơn. Cảm ơn người đã tạo ra nó rất nhiều",
    },
    {
      image:
        "https://www.anhngumshoa.com/uploads/images/resize/750x750/slide/web.jpg",
      title: "Vũ Văn Khải",
      detail:
        "Mình rất thích phần mềm, nó giúp mình học tốt hơn. Cảm ơn người đã tạo ra nó rất nhiều",
    },
    {
      image:
        "https://www.anhngumshoa.com/uploads/images/resize/750x750/slide/web.jpg",
      title: "Nguyễn Trần Nhật Hào",
      detail:
        "Mình rất thích phần mềm, nó giúp mình học tốt hơn. Cảm ơn người đã tạo ra nó rất nhiều",
    },
  ];
  return (
    <>
      <Header></Header>
      <div className="home-section" id="home-section">
        <h1 className="heading">SUNRISE</h1>
        <h3 className="title">Học tiếng anh mọi lúc mọi nơi !</h3>

        <div className="row">
          <div className="content-home-section">
            <p>
              Website được thiết kế để giúp bạn học tập, rèn luyện và chuẩn bị
              cho bài thi TOEIC chính thức, hoặc đơn giản là để cải thiện kỹ
              năng tiếng Anh của bạn, giúp theo dõi hiệu suất của bạn nhằm giúp
              bạn biết điểm mạnh, điểm yếu của mình và những gì bạn cần tập
              trung hơn để có kết quả tốt nhất.{" "}
            </p>
            <Link to="/exams">
              <button>Khám phá</button>
            </Link>
          </div>
          <div className="image-about">
            <img src={AboutImage} alt="" />
            {/* <FormCourse></FormCourse> */}
          </div>
        </div>
        <div className="box-container">
          <div className="box">
            <div className="box-icon">
              <ReadOutlined />
            </div>
            <h3>Ngữ pháp</h3>
            <p>Các bài viết giảng dạy về ngữ pháp và mẹo thi ở mỗi part</p>
          </div>

          <div className="box">
            <div className="box-icon">
              <PlayCircleOutlined />
            </div>
            <Link to="/exams">
              <h3>Luyện thi</h3>
            </Link>
            <p>Luyện tập các bài thi toeic được hỗ trợ trên website</p>
          </div>

          <div className="box">
            <div className="box-icon">
              <AppstoreOutlined />
            </div>
            <Link to="/course">
              <h3>Từ vựng</h3>
            </Link>
            <p>Học từ vựng qua các chủ đề phổ biến có kèm hình ảnh minh họa</p>
          </div>
        </div>
      </div>
      <div className="about-section" id="about-section">
        <h1 className="heading">Về chúng tôi</h1>
        <h3 className="title">
          Bắt đầu chuyến hành trình của bạn với chúng tôi
        </h3>

        <div className="row">
          <div className="content-about-section">
            <h3>
              Hãy nâng cao trình độ tiếng anh của bạn qua các bài học trên
              website của chúng tôi{" "}
            </h3>
            <p>
              Các bài học trên website đều là miễn phí, bên cạnh đó còn có các
              gói từ vựng và video được chia theo topic giúp bạn dễ dàng tiếp
              cận những chủ đề yêu thích làm cho việc học tiếng anh của bạn trở
              nên dễ dàng{" "}
            </p>
            <Link to="/course">
              <button>Tìm hiểu</button>
            </Link>
          </div>
          <div className="image-about">
            <FormCourse></FormCourse>
          </div>
        </div>
      </div>{" "}
      <Divider></Divider>
      <div className="review-section" id="review-section">
        <h1 className="heading">Đánh giá của người dùng</h1>
        <h3 className="title">Người dùng nói gì về chúng tôi ? </h3>
        <div className="slide">
          <Carousel autoplay style={{ width: "500px" }}>
            {data.map((ele, index) => (
              <SliderItem
                key={index}
                src={ele.image}
                title={ele.title}
                detail={ele.detail}
              />
            ))}
          </Carousel>
        </div>
      </div>
      <BackToTopButton />
    </>
  );
}

export default MainPage;
