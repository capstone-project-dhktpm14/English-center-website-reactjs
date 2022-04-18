import { Button, Select, message, Typography,Modal } from 'antd';
import classApi from 'api/classApi';
import meApi from 'api/meApi';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import commonFuc from 'utils/commonFuc';
import {
  ScheduleOutlined,
  InsertRowAboveOutlined,
  DeleteOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { fetchUserClass, setClassUser } from 'app/globalSlice';

import { useDispatch, useSelector } from 'react-redux';

const { Text } = Typography;
const { Option } = Select;

RegistryButton.propTypes = {
  classId: PropTypes.string,
  status :PropTypes.string,
};

RegistryButton.defaultProps = {
  classId: '',
  status:'',
};


const { confirm} = Modal;
function RegistryButton({ classId ,status}) {

  const [isRegistry, setIsRegistry] = useState();
  const [isData, setData] = useState();
  const [isFull, setIsFull] = useState(false);
  const dispatch = useDispatch();
  const [params, setParams] = useState({ classesId: classId, status: 'NEW' });
  const { classUser } = useSelector((state) => state.global);


  const cancelClass = async () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có muốn huỷ khóa học này không ?',
      async onOk() {
        try {
          setParams({ ...params, status: 'CANCEL' });
          await classApi.cancelSchedule(params);
          setIsRegistry(false);
          message.success('Bạn đã huỷ khoá học');
        } catch (error) {
          message.error('Huỷ thất bại');
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const addClass = async () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có muốn đăng ký khóa học này không ?',
      async onOk() {
        try {
          await classApi.addSchedule({ ...params, status: 'NEW' });
          setIsRegistry(true);
          message.success('Bạn đã đăng ký khoá học');
        } catch (error) {
          message.error('Đăng ký thất bại');
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  
    const fetchClass = async () => {
      const data = await meApi.fetchClassOfUser();
      for (let index = 0; index < data.length; index++) {
        if (classId === data[index].classesId && data[index].status === 'NEW' ) {
          setIsRegistry(true);
          setData(data);
        }
      }
      console.log('lap');
    };
  useEffect(() => {

    fetchClass();
    dispatch(fetchUserClass());
  }, [0]);

  useEffect(() => {
    if (status === 'FULL') {
      setIsFull(true);
    }
  }, [status]);



  return (
    <>
 {isFull ? (
            
                <div className="class-card__full">
                  {'Lớp đã đầy'}
                </div>
          
            ) : (
              <Button
              style={{ borderRadius: '50%' }}
              type={isRegistry ? 'danger' : 'primary'}
              icon={isRegistry ? <DeleteOutlined /> : <PlusOutlined />}
              size="middle"
              onClick={() => {
                isRegistry ? cancelClass() : addClass();
              }}

            ></Button>
            )}
                 
    </>
  );
}

export default RegistryButton;
