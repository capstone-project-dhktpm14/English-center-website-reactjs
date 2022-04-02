import { Spin } from 'antd';
import Footer from 'components/Footer';
import Header from 'components/Header';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Route, Routes, useLocation } from 'react-router-dom';
import './style.scss';

function Account(props) {
  useEffect(() => {
    document.title = 'Blog';
  }, []);

  return (
    <div>
      <Header></Header>
      <div className="blog_wrap_page">
        <div className="blog_page">blog</div>
      </div>
      <Footer />
    </div>
  );
}

export default Account;
