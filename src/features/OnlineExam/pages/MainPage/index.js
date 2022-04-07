import { Spin } from 'antd';
import bookApi from 'api/bookApi';
import Footer from 'components/Footer';
import Header from 'components/Header';
import ListExam from 'features/OnlineExam/components/ListExam';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './style.scss';
MainPage.propTypes = {};

function MainPage(props) {
  const { setExam, isLoading } = useSelector((state) => state.onlineExam);
  const [book, setBook] = useState([]);

  useEffect(() => {
    document.title = 'Luyện thi TOEIC';
  }, []);

  return (
    <>
      <Header></Header>
      <div id="list_exam">
        <ListExam examList={setExam} />
      </div>
      <Footer></Footer>
    </>
  );
}

export default MainPage;
