import { Carousel, Divider, Pagination, Row } from 'antd';
import Footer from 'components/Footer';
import {
  fetchCourses,
  fetchTopics,
} from 'features/Admin/pages/CoursePage/courseSlice';
import CourseList from 'features/Course/components/CourseList';
import CourseSearch from 'features/Course/components/CourseSearch';
import SliderItemCourse from 'features/Course/components/SliderItemCourse';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './style.scss';

function MainPage(props) {
  const history = useNavigate();
  const [dataSlice, setDataSlice] = useState([]);

  const [query, setQuery] = useState({
    name: '',
    topicSlug: '',
    page: 0,
    size: 12,
  });

  const dispatch = useDispatch();
  const { courses, topics } = useSelector((state) => state.courseClient);

  const { data = [], page = 1, size = 1, totalPages = 1 } = courses;

  const handleSearchChange = (queryValue) => {
    const { name, topicSlug } = queryValue;
    let params = {};
    if (name !== '') {
      params.name = encodeURIComponent(name);
    }
    if (topicSlug !== '') {
      params.topic = topicSlug;
    }
    console.log('pểm ' + JSON.stringify(params));
    history({ search: queryString.stringify(params) });

    setQuery({ page: 0, size: 12, name, topicSlug });

    console.log('que' + JSON.stringify(query));
  };

  const handlePageChange = (page, pageSize) => {
    setQuery({ ...query, page: page - 1 });
  };

  useEffect(() => {
    document.title = 'Khóa học từ vựng';
  }, []);
  // useEffect(() => {
  //   setDataSlice("");
  //   for (let index = 1; index <= 3; index++) {
  //     dataSlice.push(data[data.length - index]);
  //   }
  //   console.log(dataSlice);
  // }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchCourses(query));
    dispatch(fetchTopics());
  }, [query]);
  const data0 = [
    {
      image:
        'https://freenice.net/wp-content/uploads/2021/08/hinh-ve-cute-de-thuong-ngo-nghinh-dang-yeu-dep-nhat.jpg',
      name: 'Product',
      description:
        'A collection of poems and rhyming songs for kids to practice their pronunciation. Age Range: 6 - 10 years.',
    },
    {
      image:
        'https://phunugioi.com/wp-content/uploads/2020/10/hinh-ve-be-meo-cute-dang-yeu-dang-uong-tra-sua.jpg',
      name: 'Animal',
      description:
        'A collection of poems and rhyming songs for kids to practice their pronunciation. Age Range: 6 - 10 years.',
    },
    {
      image:
        'https://freenice.net/wp-content/uploads/2021/08/hinh-ve-cute-de-thuong-ngo-nghinh-dang-yeu-dep-nhat.jpg',
      name: 'School',
      description:
        'A collection of poems and rhyming songs for kids to practice their pronunciation. Age Range: 6 - 10 years.',
    },
  ];
  return (
    <div className="course-wrapper">
      <div className="course-slide">
        <br />
        <Carousel autoplay>
          {data.map((ele, index) => (
            <SliderItemCourse
              key={index}
              src={ele.image}
              title={ele.name}
              detail={ele.description}
              slug={ele.slug}
              wordNumber={ele.wordNumber}
            />
          ))}
        </Carousel>
      </div>
      <Divider></Divider>
      <div id="course-main-page">
        <Row justify="start" gutter={[8, 8]}>
          <CourseSearch topics={topics} onChange={handleSearchChange} />
        </Row>

        <Divider />

        <CourseList courses={data} />

        {totalPages > 1 && (
          <Row justify="center">
            <Pagination
              total={totalPages * size}
              showQuickJumper
              pageSize={size}
              onChange={handlePageChange}
              showSizeChanger={false}
              current={page + 1}
            />
          </Row>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
}

MainPage.propTypes = {};
MainPage.defaultProps = {};

export default MainPage;
