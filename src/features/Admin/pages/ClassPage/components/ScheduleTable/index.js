import { Table } from "antd";
import Column from "antd/lib/table/Column";
import PropTypes from "prop-types";
import React from "react";
import ScheduleAction from "../ScheduleAction";
import ExamAction from "../ScheduleAction";

function ScheduleTable(props) {
  const { setInitialValue, setIsModalVisible, setIsAddMode, schedules, query } =
    props;

  return (
    <Table dataSource={schedules} pagination={false}>
      <Column
        align="center"
        width="60px"
        title="STT"
        dataIndex="stt"
        key="stt"
      />
      <Column title="Ngày" dataIndex="date" key="date" />
      <Column title="Mô tả" dataIndex="description" key="description" />
      <Column title="Phòng" dataIndex="room" key="room" />
      <Column title="Session" dataIndex="session" key="session" />
      <Column
        key="action"
        align="center"
        render={(record, index) => {
        //   {
        //     {
        //       console.log("rec " + JSON.stringify(record));
        //     }
        //   }
          return (
            <ScheduleAction
              scheduleId={record.id}
              schedule={record}
              setInitialValue={setInitialValue}
              setIsModalVisible={setIsModalVisible}
              setIsAddMode={setIsAddMode}
              query={query}
            />
          );
        }}
      />
    </Table>
  );
}

ScheduleTable.propTypes = {
  exams: PropTypes.array,
  setInitialValue: PropTypes.func,
  setIsModalVisible: PropTypes.func,
  setIsAddMode: PropTypes.func,
  query: PropTypes.object,
};

ScheduleTable.defaultProps = {
  exams: [],
  setInitialValue: null,
  setIsModalVisible: null,
  setIsAddMode: null,
};

export default ScheduleTable;
