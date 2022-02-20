import { Carousel } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import SliderItem from "../SliderItem";

function Slider() {
  //const { features } = useSelector(state => state.home);

  const data = [
    {
      image:
        "https://www.anhngumshoa.com/uploads/images/resize/750x750/220104-to-1300x600.png",
      title: "Nguyễn Trần Nhật Hào",
      descrpition: "18055671",
    },
    {
      image:
        "https://www.anhngumshoa.com/uploads/images/resize/750x750/slide/web.jpg",
      title: "Vũ Văn Khải",
      descrpition: "18068771",
    },
    {
      image:
        "https://www.anhngumshoa.com/uploads/images/resize/750x750/220120-to-postfb-1200x6301.jpg",
      title: "Nguyễn Trần Nhật Hào",
      descrpition: "18055671",
    },
  ];

  return (
    <Carousel autoplay dots={false}>
      {data.map((ele, index) => (
        <SliderItem
          key={index}
          src={ele.image}
          //   title={ele.title}
          //   detail={ele.descrpition}
        />
      ))}
    </Carousel>
  );
}

export default Slider;
