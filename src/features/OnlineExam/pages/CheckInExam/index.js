import {  ClockCircleOutlined,FieldTimeOutlined  } from '@ant-design/icons';
import { Button, Space } from 'antd';
import bookApi from 'api/bookApi';
import { refreshStore } from 'features/OnlineExam/onlineExamSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import './style.scss';
CheckInExam.propTypes = {};

function CheckInExam(props) {
  const { setExam } = useSelector((state) => state.onlineExam);
  const dispatch = useDispatch();
  const history = useNavigate();
  const [examTitle, setExamTitle] = useState('');
  const { testId } = useParams();
  const [book, setBook] = useState([]);

  useEffect(() => {
    document.title = examTitle;
  });

//   const getBooks = async () => {
//     setBook(await bookApi.fetchBook());
//     console.log(book);
//   };


  useEffect(() => {
    if (setExam.length > 0) {
		setExam.find((c) => {
        let temp = c.exams.find((b) => b.slug === testId);
        if (temp !== null && temp !== undefined) {
          setExamTitle(temp.name);
          document.title = temp.name;
        }
        return temp;
      });
    }
  }, [setExam, testId]);

  function handleOnClick() {
    dispatch(refreshStore());
    history(`/exams/${testId}/examining`);
  }

  return (
    <div className="checkin-exam">
      <Space direction="vertical" size="large">
        <div className="checkin-exam_title">
          <span>{examTitle}</span>
        </div>

        <div className="checkin-exam_info">
          <Space direction="vertical">
            <span className="checkin-exam_info--time total--time ">
              <ClockCircleOutlined />
              &nbsp; Tổng thời gian: 120
            </span>
            <span className="checkin-exam_info--time">
            <FieldTimeOutlined />
              &nbsp; Listening: 45
            </span>
            <span className="checkin-exam_info--time">
            <FieldTimeOutlined />
              &nbsp; Reading : 75
            </span>
          </Space>
        </div>

        <div className="checkin-exam_button">
          <Button
            type="primary"
            block
            shape="round"
            className="checkin-exam_button--width"
            onClick={handleOnClick}
          >
            START
          </Button>
        </div>
      </Space>
    </div>
  );
}

export default CheckInExam;
