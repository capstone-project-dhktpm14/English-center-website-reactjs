import { Table } from 'antd';
import classAdminApi from 'api/admin/classAdminApi';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RouteAction from '../ClassAction';

ClassTable.propTypes = {};

const columns = [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
  },
  {
    title: 'Số lượng ',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'mô tả ',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'trang thai ',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    render: (text, record) => <RouteAction classId={record.key} />,
  },
];

function ClassTable(props) {
  const dispatch = useDispatch();
  const [dataSource, setDataSource] = useState({});
  const { classes } = useSelector((state) => state.classes);
  const data = [];

  const fetchClass = async () => {
    await classAdminApi.fetchClass().then((res) => setDataSource(res.data));
  };

  useEffect(() => {
    fetchClass();
  }, [classes]);

  if (dataSource.length > 0) {
    dataSource.forEach((element, index) => {
      let temp = {
        key: element.id,
        amount: element.amount,
        description: element.description,
        status: element.status,
        stt: index + 1,
      };
      data.push(temp);
    });
  }
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      scroll={{ y: 420 }}
      style={{ height: '490px' }}
    />
  );
}

export default ClassTable;
