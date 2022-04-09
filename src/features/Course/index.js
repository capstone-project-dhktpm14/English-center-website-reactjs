import { Spin } from 'antd';
import Footer from 'components/Footer';
import Header from 'components/Header';
import NotFoundPage from 'components/NotFoundPage';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useRouteMatch } from 'react-router-dom';
import MainPage from './pages/MainPage';
import TopicPage from './pages/TopicPage';
import './style.scss';

function Course(props) {
  return (
    <div>
      <Header />
      <div className="course">
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route exact path="/:slug" element={<TopicPage />} />
          <Route element={<NotFoundPage />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
Course.propTypes = {};
Course.defaultProps = {};

export default Course;
