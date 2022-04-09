import { EditOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
  message,
  Row,
  Space,
  Spin,
  Typography,
} from 'antd';
import Modal from 'antd/lib/modal/Modal';
import classAdminApi from 'api/admin/classAdminApi';
import examApi from 'api/admin/examAdminApi';

import ModalTitle from 'components/ModalTitle';
import InputField from 'customfield/InputField';
import SelectedField from 'customfield/SelectField';
import UploadField from 'customfield/UploadField';

import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { setClassFormVisible } from '../../classSlice';
import { scheduleValues } from '../../initialAndValidateValues';

const { Text } = Typography;
function ScheduleModal(props) {
  const { isModalVisible, setIsModalVisible, isAddMode, initialValue, query } =
    props;
  const options = [
    {
      key: 1,
      value: 'true',
    },
    {
      key: 0,
      value: 'false',
    },
  ];

  const [confirmLoading, setConfirmLoading] = useState(false);
  const { isClassFormVisible, selectedClass } = useSelector(
    (state) => state.classes
  );
  const location = useLocation();

  const dispatch = useDispatch();

  const handleCancel = () => {
    // setIsModalVisible(false);
    // setInitialValue(scheduleValues.initial);
    dispatch(setIsModalVisible(false));
    console.log(isModalVisible);
  };

  // const handleOnClick = () => {
  //   setIsModalVisible(true);
  //   setIsAddMode(true);
  //   setInitialValue(scheduleValues.initial);
  // };
  const handleSubmit = async (values, actions) => {
    setConfirmLoading(true);
    const { id } = values;
    const schedule = { ...values };
    let routeIdWasSave = id;
    try {
      if (id) {
        await handleUpdate(schedule, actions);
        console.log('update handle');
      } else {
        schedule.classId = location.pathname.slice(15);
        routeIdWasSave = await handleAddSchedule(schedule, actions);
        console.log('add handle');
      }
    } catch (error) {
      console.log('loi');
    }
    setConfirmLoading(false);
    message.success('Thao tác thành công');
    dispatch(setIsModalVisible(false));
  };

  const handleAddSchedule = async (schedule, actions) => {
    const serverResult = await classAdminApi.addSchedule(schedule);

    if (serverResult.error) {
      actions.setErrors(serverResult.error);
      throw new Error();
    }
    return serverResult.id;
  };

  const handleUpdate = async (schedule, actions) => {
    console.log('uid ' + schedule.id);
    const serverResult = await classAdminApi.updateSchedule(
      schedule.id,
      schedule
    );

    if (serverResult.error) {
      actions.setErrors(serverResult.errors);
      throw new Error();
    }
    message.success('Cập nhật thành công');
  };

  const formRef = useRef();

  const handleSubmitClick = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  return (
    <div id="blog-add-page">
      schedule modal
      <Modal
        title={
          <ModalTitle
            title={isAddMode ? 'Thêm mới ' : 'Cập nhật '}
            icon={isAddMode ? <PlusOutlined /> : <EditOutlined />}
          />
        }
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
        centered
      >
        <Formik
          initialValues={initialValue}
          validationSchema={scheduleValues.validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {(formikProps) => {
            const { values, errors, touched, isSubmitting, setFieldValue } =
              formikProps;
            return (
              <Form>
                <Space
                  direction="vertical"
                  size="middle"
                  style={{ width: '100%' }}
                >
                  <FastField
                    component={InputField}
                    name="classId"
                    onChange={(value, e) =>
                      setFieldValue(
                        'classId',
                        location.pathname.slice(15)
                      ).then(console.log('eee' + location.pathname.slice(15)))
                    }
                    type="hidden"
                  />
                  <Row>
                    <Col span="6">
                      <Text strong>
                        {'Ngày'}

                        {/* {isRequire && <Text type="danger"> *</Text>} */}
                      </Text>
                    </Col>

                    <DatePicker
                      selected={values.date}
                      dateFormat="dd,MM, yyyy"
                      className="form-control"
                      name="date"
                      onChange={(value, e) =>
                        setFieldValue('date', value.format('DD/MM/yyyy')).then(
                          console.log('eee' + value.format('DD/MM/yyyy'))
                        )
                      }
                    />
                  </Row>
                  <FastField
                    name="description"
                    component={InputField}
                    title="Mô tả"
                    titleCol={6}
                    maxLength={200}
                    inputCol={18}
                    isRequire={true}
                  />
                  <FastField
                    name="room"
                    component={InputField}
                    title="Phòng"
                    titleCol={6}
                    maxLength={200}
                    inputCol={18}
                    isRequire={true}
                  />
                  <FastField
                    name="session"
                    component={InputField}
                    title="Sesion"
                    titleCol={6}
                    maxLength={200}
                    inputCol={18}
                    isRequire={true}
                  />
                  <FastField
                    name="status"
                    component={SelectedField}
                    title="Trạng thái"
                    options={options}
                    titleCol={6}
                    inputCol={18}
                    isRequire={true}
                  />
                </Space>
                <Row justify="end" style={{ marginTop: '20px' }}>
                  <Col>
                    <Space size="middle">
                      <Button onClick={handleCancel}>Hủy</Button>

                      <Button htmlType="submit" type="primary">
                        {isSubmitting && (
                          <Spin
                            indicator={
                              <LoadingOutlined
                                style={{ color: 'white' }}
                                spin
                              />
                            }
                          />
                        )}
                        {isAddMode ? 'Thêm' : 'Lưu'}
                      </Button>
                    </Space>
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </div>
  );
}
ScheduleModal.propTypes = {
  isModalVisible: PropTypes.bool,
  setIsModalVisible: PropTypes.func,
  isAddMode: PropTypes.bool,
  initialValue: PropTypes.object,
  query: PropTypes.object,
};

ScheduleModal.defaultProps = {
  isModalVisible: false,
  setIsModalVisible: null,
  isAddMode: true,
  // initialValue: examValues.initial,
  query: {
    dateFrom: '',
    dateTo: '',
    page: 0,
    size: 10,
  },
};
export default ScheduleModal;
