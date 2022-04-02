import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Pagination, Row, Space } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import RouteTable from '../../components/ClassTable';
import RouteAddForm from '../../components/ClassAddForm';
import { fetchClasses, fetchSchedules, setSchedules } from '../../classSlice';
import ScheduleTable from '../../components/ScheduleTable';
import ScheduleModal from '../../components/ScheduleModal';
import commonFuc from 'utils/commonFuc';
import { examValues } from 'features/Admin/pages/Exam/initialAndValidateValues';
import classAdminApi from 'api/admin/classAdminApi';
import { matchPath, useLocation, useParams } from 'react-router';
import { scheduleValues } from '../../initialAndValidateValues';
ClassDetail.propTypes = {};

function ClassDetail(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const [dataSource, setDataSource] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddMode, setIsAddMode] = useState(true);
  const [initialValue, setInitialValue] = useState(examValues.initial);
  const { schedulesPage } = useSelector((state) => state.classes);

  const [query, setQuery] = useState({
    dateFrom: '',
    dateTo: '',
    page: 0,
    size: 10,
  });

  const handleOnClick = () => {
    setIsModalVisible(true);
    setIsAddMode(true);
    setInitialValue(scheduleValues.initial);
  };

  const handleSearchChange = (queryValue) => {
    const { dateFrom, dateTo } = queryValue;
    setQuery({ page: 0, size: 10, dateFrom, dateTo });
  };

  const handlePageChange = (page, pageSize) => {
    setQuery({ ...query, page: page - 1 });
  };
  useEffect(() => {
    const handleFetchSchedule = async () => {
      setQuery({
        page: 0,
        size: 10,
      });
      const delta = await classAdminApi.fetchSchedules(
        query,
        location.pathname.slice(15)
      );
      setDataSource(delta);
      dispatch(setSchedules(delta));
      return delta;
    };
    handleFetchSchedule();
  }, [schedulesPage]);
  return (
    <div id="exam-main-page">
      <Row justify="space-between" gutter={[8, 8]}>
        <Col xs={24} sm={24} md={24} lg={4} xl={4}>
          <Button
            type="primary"
            onClick={handleOnClick}
            icon={<PlusCircleOutlined />}
          >
            Thêm lịch học
          </Button>
        </Col>
        {/* <ExamSearch books={books} onChange={handleSearchChange} /> */}
      </Row>

      <Space direction="vertical" style={{ width: '100%' }}>
        <div className="course-main-page__table">
          <ScheduleTable
            schedules={commonFuc.addSTTForList(
              dataSource.data,
              query.page * query.size
            )}
            setInitialValue={setInitialValue}
            setIsModalVisible={setIsModalVisible}
            setIsAddMode={setIsAddMode}
            query={query}
          />
        </div>
        <div style={{ textAlign: 'right' }}>
          <Pagination
            current={dataSource.page + 1}
            total={dataSource.totalPages * 10}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </Space>

      {isModalVisible && (
        <ScheduleModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          isAddMode={isAddMode}
          initialValue={initialValue}
          query={query}
        />
      )}
    </div>
  );
}

export default ClassDetail;
