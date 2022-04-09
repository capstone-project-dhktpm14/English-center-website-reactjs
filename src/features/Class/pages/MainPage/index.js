import { Carousel, Divider, Pagination, Row } from 'antd';
import classApi from 'api/classApi';
import routeApi from 'api/routeApi';
import Footer from 'components/Footer';
import Header from 'components/Header';
import {
  fetchCourses,
  fetchTopics,
} from 'features/Admin/pages/CoursePage/courseSlice';
import { fetchClasses } from 'features/Class/classSlice';
import ClassList from 'features/Class/components/ClassList';
import ClassSearch from 'features/Class/components/ClassSearch';

import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './style.scss';

function MainPage(props) {
  const history = useNavigate();
  const [query, setQuery] = useState({
    routeSlug: '',
    dateFrom: '',
    dateTo: '',
    page: 0,
    size: 12,
  });

  const dispatch = useDispatch();
  const { classes } = useSelector((state) => state.classClient);
  const { data = [], page = 1, size = 1, totalPages = 1 } = classes;

  const handleSearchChange = (queryValue) => {
    const { routeSlug, dateFrom, dateTo } = queryValue;
    let params = {};

    if (routeSlug !== '') {
      params.route = routeSlug;
    }
    if (dateFrom !== '') {
      params.dateFrom = dateFrom;
    }
    if (dateTo !== '') {
      params.dateTo = dateTo;
    }
    console.log('pểm ' + JSON.stringify(params));
    history({ search: queryString.stringify(params) });
    setQuery({
      ...query,
      dateFrom: '',
      dateTo: '',
      routeSlug: routeSlug,
    });
    // setQuery({ routeSlug, dateFrom, dateTo, page: 0, size: 12 });
    console.log('que' + JSON.stringify(query));
  };

  const handlePageChange = (page, pageSize) => {
    setQuery({ ...query, page: page - 1 });
  };

  const [dataSource, setDataSource] = useState({});
  const { routes } = useSelector((state) => state.route);
  const dataOption = [];
  useEffect(() => {
    routeApi.getRoutes(query).then((res) => setDataSource(res.data));
  }, [routes]);

  useEffect(() => {
    window.scrollTo(0, 0);
    // classApi.fetchClass(query).then((res) => setDataClass(res.data));
    // console.log("quẻy " + JSON.stringify(query));
    // console.log("data class " + JSON.stringify(dataClass));
    dispatch(fetchClasses(query));
  }, [query]);
  if (dataSource.length > 0) {
    dataSource.forEach((element, index) => {
      let temp = {
        key: element.id,
        name: element.name,
        slug: element.slug,
      };
      dataOption.push(temp);
    });
  }
  return (
    <div className="course-wrapper">
      <div id="course-main-page">
        <Row justify="start" gutter={[8, 8]}>
          <ClassSearch routes={dataOption} onChange={handleSearchChange} />
        </Row>

        <Divider />

        <ClassList classes={data} />

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
