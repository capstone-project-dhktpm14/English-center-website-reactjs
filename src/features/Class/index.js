import Header from 'components/Header';
import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import MainPage from './pages/MainPage';
import NotFoundPage from 'components/NotFoundPage';
import './style.scss';
import Footer from 'components/Footer';

function Account(props) {
  useEffect(() => {
    document.title = 'Lớp Học';
  }, []);

  return (
    <div>
      <Header />
      <div className="class_wrap_page">
        <div className="class_page">
          <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Account;
