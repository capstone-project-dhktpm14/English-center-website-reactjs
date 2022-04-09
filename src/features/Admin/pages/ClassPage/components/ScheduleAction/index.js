import {
  DeleteTwoTone,
  EditTwoTone,
  ExclamationCircleOutlined,
  InfoCircleTwoTone,
} from '@ant-design/icons';
import { unwrapResult } from '@reduxjs/toolkit';
import { Button, Dropdown, Menu, message, Modal } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import classAdminApi from 'api/admin/classAdminApi';
import { deleteExam, fetchExams } from 'features/Admin/pages/Exam/examSlice';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  deleteClass,
  deleteSchedule,
  setClassFormVisible,
  setClassUpdate,
  setSchedules,
  setScheduleUpdate,
} from '../../classSlice';
import './style.scss';

const { confirm, Text } = Modal;

function ScheduleAction(props) {
  const {
    scheduleId,
    schedule,
    setInitialValue,
    setIsModalVisible,
    setIsAddMode,
  } = props;
  const history = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleOnUpdateClick = () => {
    setInitialValue(schedule);
    setIsAddMode(false);
    setIsModalVisible(true);
  };

  const { schedulesPage } = useSelector((state) => state.classes);
  const [dataSource, setDataSource] = useState({});
  const [query, setQuery] = useState({
    dateFrom: '',
    dateTo: '',
    page: 0,
    size: 10,
  });

  const handleUpdate = () => {
    const schedule = dataSource.data.find((c) => c.id === scheduleId);
    console.log(scheduleId);
    dispatch(setScheduleUpdate(schedule));
    dispatch(setClassFormVisible(true));
  };

  const handleDelete = () => {
    confirm({
      content: 'Bạn có chắc chắn xóa không ?',
      async onOk() {
        try {
          unwrapResult(await dispatch(deleteSchedule({ scheduleId })));
          message.success('Xóa thành công');
        } catch (error) {
          message.error('Xóa thất bại');
        }
      },
    });
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={handleOnUpdateClick}>
        <div className="menu-adjust--center">
          <EditTwoTone twoToneColor="#ad8b00" />
          <span className="menu-title">Sửa</span>
        </div>
      </Menu.Item>

      <Menu.Divider />
      <Menu.Item onClick={handleDelete}>
        <div className="menu-adjust--center">
          <DeleteTwoTone twoToneColor="#a8071a" />
          <span className="menu-title">Xóa</span>
        </div>
      </Menu.Item>
    </Menu>
  );
  // useEffect(() => {
  //   const handleFetchSchedule = async () => {
  //     setQuery({
  //       page: 0,
  //       size: 10,
  //     });
  //     const delta = await classAdminApi.fetchSchedules(
  //       query,
  //       location.pathname.slice(15)
  //     );
  //     setDataSource(delta);
  //     return delta;
  //   };
  //   handleFetchSchedule();
  //   dispatch(setSchedules(dataSource));
  // }, []);
  return (
    <Dropdown overlay={menu} placement="bottomLeft">
      <Button type="primary" ghost>
        Thao tác
      </Button>
    </Dropdown>
  );
}

ScheduleAction.propTypes = {
  scheduleId: PropTypes.number.isRequired,
  schedule: PropTypes.object,
  setInitialValue: PropTypes.func,
  setIsModalVisible: PropTypes.func,
  setIsAddMode: PropTypes.func,
};

ScheduleAction.defaultProps = {
  scheduleId: '',
  schedule: {},
  setInitialValue: null,
  setIsModalVisible: null,
  setIsAddMode: null,
};

export default ScheduleAction;
