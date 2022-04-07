import { Spin } from 'antd';
import NotFoundPage from 'components/NotFoundPage';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useRouteMatch } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ParagraphPage from './pages/ParagraphPage';
import QuestionPage from './pages/QuestionPage';

Exam.propTypes = {};

function Exam(props) {
  // const { url } = useRouteMatch();
  const { isLoading } = useSelector((state) => state.exam);

  return (
    <Spin spinning={isLoading}>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route exact path="/questions" element={<QuestionPage />} />
        <Route exact path="/paragraphs" element={<ParagraphPage />} />
        <Route exact path="/paragraphs/questions" element={<QuestionPage />} />
        <Route component={<NotFoundPage />} />
      </Routes>
    </Spin>
  );
}

export default Exam;
