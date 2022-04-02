import { Spin } from 'antd';
import NotFoundPage from 'components/NotFoundPage';
import TopicPage from 'features/Course/pages/TopicPage';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  Route,
  Routes,
  Switch,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import CourseDetailPage from './pages/CourseDetailPage';
import MainPage from './pages/MainPage';

function CoursePage(props) {
  const { isLoading } = useSelector((state) => state.course);
  return (
    <Spin spinning={isLoading}>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/topics" element={<TopicPage />} />
      <Route path="/:slug" element={<CourseDetailPage />} />
      <Route element={<NotFoundPage />} /> 
    </Routes>
    </Spin>
  );
}
CoursePage.propTypes = {};

export default CoursePage;
