import { Table, Tag,Tooltip,Button,message,Menu,Dropdown } from 'antd';
import Column from 'antd/lib/table/Column';
import settings from 'constants/settings';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import commonFuc from 'utils/commonFuc';
import { DeleteOutlined ,PlusOutlined,ExclamationCircleOutlined,MoreOutlined} from '@ant-design/icons';
import classApi from 'api/classApi';
import meApi from 'api/meApi';
import RegistryButton from '../RegistryButton';
import { useDispatch } from 'react-redux';
import { fetchClasses } from 'features/Class/classSlice';

// import ClassAction from '../ClassAction';

function ClassesTable(props) {
  // eslint-disable-next-line react/prop-types
  const {  classes} =props;
  const {  status } = classes;
    const dispatch = useDispatch();
  const getClassStatusObj = (status) => {
    // eslint-disable-next-line no-unused-vars
    for (const [_, element] of Object.entries(settings.constants.ClassStatus)) {
      if (element.key === status) {
        return element;
      }
    }
  };
  useEffect(() => {
 dispatch(fetchClasses());
  },[status]);


  return (
    <Table
      dataSource={classes}
      pagination={false}
      rowKey={(record) => record.id}
    >
      <Column
        align="center"
        width="60px"
        title="STT"
        dataIndex="stt"
        key="stt"
      />
      <Column title="Mã lớp học" width="108px" dataIndex="id" key="id" />
      <Column title="Khoá học" dataIndex="levelName" key="levelName" />
      <Column title="Ngày bắt đầu" dataIndex="dateStart" key="dateStart" />
      <Column
        title="Ngày học"
        dataIndex="date"
        key="date"
        render={(_, record) => (
          <span>{commonFuc.toVietnamDay(record.date).join(', ')}</span>
        )}
      />
      <Column
        title="Trạng thái"
        dataIndex="status"
        key="status"
        render={(_, record) => {
          const status = getClassStatusObj(record.status);
          return <Tag color={status.color}>{status.value}</Tag>;
        }}
      />
      <Column
        key="action"
        align="center"
        render={(_, record) => {
          return <RegistryButton classId={record.id} status= {status} />;
      }}
      />
    </Table>
  );
}

ClassesTable.propTypes = {
  classes: PropTypes.array,
  setInitialValue: PropTypes.func,
  setIsModalVisible: PropTypes.func,
  setIsAddMode: PropTypes.func,
  query: PropTypes.object,
};

ClassesTable.defaultProps = {
  classes: [],
  setInitialValue: null,
  setIsModalVisible: null,
  setIsAddMode: null,
};

export default ClassesTable;
