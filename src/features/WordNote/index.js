import { Spin } from 'antd';
import Footer from 'components/Footer';
import Header from 'components/Header';
import NotFoundPage from 'components/NotFoundPage';
import LoginPage from 'features/Account/pages/LoginPage';
import TopicPage from 'features/Course/pages/TopicPage';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useLocation, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ReviewPage from './pages/ReviewPage';
import WordPage from './pages/WordPage';


import './style.scss';

function WordNote(props) {
  const { isLoading } = useSelector((state) => state.global);

  return (
    <>
      <Header></Header>
      <div id="word-note-page">
        <div className="word-note-container">
          <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route exact path="/:wordnoteId" element={<WordPage />} />
            <Route exact path="/:wordnoteId/review" element={<ReviewPage />} />
            <Route element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
WordNote.propTypes = {};
WordNote.defaultProps = {};

export default WordNote;
