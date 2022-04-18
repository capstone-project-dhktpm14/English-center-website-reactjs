import {  Pagination, Row, Space } from 'antd';
import { fetchClasses } from 'features/Class/classSlice';
import ClassesSearch from 'features/Class/components/ClassesSearch';
import ClassesTable from 'features/Class/components/ClassesTable';

import { fetchRoutes } from 'features/Route1/routeSlice';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import commonFuc from 'utils/commonFuc';
import './style.scss';

function MainPage(props) {
  const dispatch = useDispatch();

  const { routes } = useSelector((state) => state.routeClient);
  const { classes } = useSelector((state) => state.classClient);
  const { data, page, totalPages } = classes;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddMode, setIsAddMode] = useState(true);
  // const [initialValue, setInitialValue] = useState(classesValues.initial);

  const [query, setQuery] = useState({
    levelSlug: '',
    status: '',
    dateFrom: '',
    dateTo: '',
    page: 0,
    size: 10,
  });

  const handleSearchChange = (queryValue) => {
    const { levelSlug, status, dateFrom, dateTo } = queryValue;

    setQuery({ levelSlug, status, dateFrom, dateTo, page: 0, size: 10 });
  };

  const handlePageChange = (page) => {
    setQuery({ ...query, page: page - 1 });
  };

  useEffect(() => {
    dispatch(fetchClasses(query));
    dispatch(fetchRoutes());
  }, [query]);

  return (
    <div id="class-main-page">
      <Row justify="center" >
        <ClassesSearch levels={routes} onChange={handleSearchChange} />
      </Row>

      <Space direction="vertical" style={{ width: '100%' }}>
        <div className="class-main-page__table">
          <ClassesTable
            classes={commonFuc.addSTTForList(data, query.page * query.size)}
            // setInitialValue={setInitialValue}
            setIsModalVisible={setIsModalVisible}
            setIsAddMode={setIsAddMode}
            query={query}
          />
        </div>
        <div style={{ textAlign: 'right' }}>
          <Pagination
            current={page + 1}
            total={totalPages * 10}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </Space>
     
    </div>
  );
}

MainPage.propTypes = {};
MainPage.defaultProps = {};

export default MainPage;
