import { Divider, Pagination, Row } from "antd";
import Footer from "components/Footer";
import {
  fetchCourses,
  fetchTopics,
} from "features/Admin/pages/CoursePage/courseSlice";
import CourseList from "features/Course/components/CourseList";
import CourseSearch from "features/Course/components/CourseSearch";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.scss";

function MainPage(props) {
  const history = useNavigate();

  const [query, setQuery] = useState({
    name: "",
    topicSlug: "",
    page: 0,
    size: 12,
  });

  const dispatch = useDispatch();
  const { courses, topics } = useSelector((state) => state.courseClient);
  console.log(courses);

  const { data = [], page = 1, size = 1, totalPages = 1 } = courses;

  const handleSearchChange = (queryValue) => {
    const { name, topicSlug } = queryValue;
    let params = {};
    if (name !== "") {
      params.name = encodeURIComponent(name);
    }
    if (topicSlug !== "") {
      params.topic = topicSlug;
    }
    history({ search: queryString.stringify(params) });

    setQuery({ page: 0, size: 12, name, topicSlug });
  };

  const handlePageChange = (page, pageSize) => {
    setQuery({ ...query, page: page - 1 });
  };

  useEffect(() => {
    document.title = "Khóa học từ vựng";
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchCourses(query));
    dispatch(fetchTopics());
  }, [query]);

  return (
    <div className="course-wrapper">
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
