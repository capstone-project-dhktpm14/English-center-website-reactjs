import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RouteAction from '../RouteAction';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Tag, Space, Image } from 'antd';
import { errorImage } from 'constants/defaultImage';
import { fetchRoutes, setRoutes } from '../../routeSlice';
import routeAdminApi from 'api/admin/routeAdminApi';
import commonFuc from 'utils/commonFuc';

RouteTable.propTypes = {};

const columns = [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
  },
  {
    title: 'Tên Route ',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Hình ảnh ',
    dataIndex: 'image',
    key: 'image',
    render: (text, record) => (
      <Image
        width={120}
        src={text ? text : errorImage}
        height={80}
        fallback={errorImage}
        style={{ objectFit: 'cover', backgroundPosition: 'center center' }}
      />
    ),
    // <img className="book_img" src={text} alt='hình ảnh' />
  },
  {
    title: '',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    render: (text, record) => <RouteAction routeId={record.key} />,
  },
];

function RouteTable(props) {
  const dispatch = useDispatch();
  const [dataRaw, setData] = useState([]);
  const [dataSource, setDataSource] = useState({});

  // Lấy ữ liệu từ store
  const { routes } = useSelector((state) => state.route);
  const data = [];



  // Hàm commonFuc.addSTTForList() này là để thêm số thứ tự vào dữ liẹu
  //  ko cần phải làm như cách cũ  nữa
  
  return (
    <Table
      columns={columns}
      dataSource={commonFuc.addSTTForList(routes, 0)}
      pagination={false}
      scroll={{ y: 420 }}
      style={{ height: '490px' }}
    />
  );
}

export default RouteTable;
