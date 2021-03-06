import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Space } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchRoutes,
  setRouteDefault,
  setRouteFormVisible,
} from '../../routeSlice';
import RouteTable from '../../components/RouteTable';
import RouteAddForm from '../../components/RouteAddForm';
MainPage.propTypes = {};

function MainPage(props) {

  // Chỗ này dugf để lấy dữ liệu từ store ra
  const { isRouteFormVisible, routes } = useSelector((state) => state.route);



  const dispatch = useDispatch();

  useEffect(() => {
    // M chỉ cần dispatch cái hàm lúc nãy, là dữ liệu sẽ  tự động get về và lưu vào trong store
    // ko cần phải fetch giống như cách m dang làm
    dispatch(fetchRoutes());
  }, []);

  const handleAddClick = () => {
    dispatch(setRouteFormVisible(true));
    dispatch(setRouteDefault());
    console.log(isRouteFormVisible);
  };

  return (
    <div id="book-main-page">
      <Space direction="vertical" style={{ width: '100%' }}>
        <div
          className="book-category-button--add"
          style={{ textAlign: 'left' }}
        >
          <Button
            type="primary"
            onClick={handleAddClick}
            icon={<PlusCircleOutlined />}
            size="mediunm"
          >
            Thêm route mới
          </Button>
        </div>

        <div className="book-category-table">
          <RouteTable />
        </div>
      </Space>

      {isRouteFormVisible && <RouteAddForm />}
    </div>
  );
}

export default MainPage;
