import { Carousel } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import SliderItem from '../SliderItem';

function SliderReview() {
  //const { features } = useSelector(state => state.home);

  const data = [
    {
      image:
        'https://www.anhngumshoa.com/uploads/images/resize/750x750/slide/web.jpg',
      title: 'Nguyễn Trần Nhật Hào',
      detail: '18055671',
    },
    {
      image:
        'https://www.anhngumshoa.com/uploads/images/resize/750x750/slide/web.jpg',
      title: 'Vũ Văn Khải',
      detail: '18068771',
    },
    {
      image:
        'https://www.anhngumshoa.com/uploads/images/resize/750x750/slide/web.jpg',
      title: 'Nguyễn Trần Nhật Hào',
      detail: '18055671',
    },
  ];
  console.log(data);

  return (
    <Carousel autoplay dots={false}>
      {data.map((ele, index) => (
        <SliderItem
          key={index}
          src={ele.image}
          title={ele.title}
          detail={ele.detail}
        />
      ))}
    </Carousel>
  );
}

export default SliderReview;
