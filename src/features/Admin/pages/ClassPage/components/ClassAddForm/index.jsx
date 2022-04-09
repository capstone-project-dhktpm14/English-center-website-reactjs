import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import ModalTitle from "components/ModalTitle";
import { FastField, Form, Formik, useFormikContext } from "formik";
import InputField from "customfield/InputField";
import { useDispatch, useSelector } from "react-redux";
import { Modal, message, Space, DatePicker, Row, Col, Typography } from "antd";
import { format, compareAsc } from "date-fns/esm";

import ImageField from "customfield/ImageField";
import {
  addRoute,
  fetchClasses,
  fetchRoutes,
  setClassFormVisible,
  setRouteFormVisible,
} from "../../classSlice";
import routeAdminApi from "api/routeAdminApi";
import { classValues, routeValues } from "../../initialAndValidateValues";
import SelectedField from "customfield/SelectField";
import classAdminApi from "api/classAdminApi";
import DayPickerField from "customfield/DayPickerField";
import { date } from "yup";
import { getTimeProps } from "antd/lib/date-picker/generatePicker";
import RouteSelectedField from "customfield/RouteSelectField";
import TextAreaField from "customfield/TextAreaField";

RouteAddForm.propTypes = {};
const { Text } = Typography;
function RouteAddForm(props) {
  const options = [
    {
      key: "ONGOING",
      value: "ONGOING",
    },
    {
      key: "FULL",
      value: "FULL",
    },
    {
      key: "CANCEL",
      value: "CANCEL",
    },
    {
      key: "ACCEPT",
      value: "ACCEPT",
    },
  ];

  const days = [
    {
      key: "MONDAY",
      value: "MONDAY",
    },
    {
      key: "TUESDAY",
      value: "TUESDAY",
    },
    {
      key: "WEDNESDAY",
      value: "WEDNESDAY",
    },
    {
      key: "THURSDAY",
      value: "THURSDAY",
    },
    {
      key: "FRIDAY",
      value: "FRIDAY",
    },
    {
      key: "SATURDAY",
      value: "SATURDAY",
    },
    {
      key: "SUNDAY",
      value: "SUNDAY",
    },
  ];

  const [confirmLoading, setConfirmLoading] = useState(false);
  const { isClassFormVisible, selectedClass } = useSelector(
    (state) => state.classes
  );
  const { routes } = useSelector((state) => state.route);

  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch(setClassFormVisible(false));
  };
  const handleSubmit = async (values, actions) => {
    setConfirmLoading(true);
    const { id } = values;
    const classes = { ...values };
    let routeIdWasSave = id;
    try {
      if (id) {
        await handleUpdate(classes, actions);
        console.log("update handle");
      } else {
        routeIdWasSave = await handleAddClass(classes, actions);
        console.log("add handle");
      }
    } catch (error) {
      console.log("loi");
    }
    setConfirmLoading(false);
    message.success("Thao tác thành công");
    dispatch(setClassFormVisible(false));
    dispatch(fetchClasses());
  };

  const handleAddClass = async (classes, actions) => {
    const serverResult = await classAdminApi.addClass(classes);

    if (serverResult.error) {
      actions.setErrors(serverResult.error);
      throw new Error();
    }
    // dispatch(addBook(serverResult));
    return serverResult.id;
  };

  const handleUpdate = async (route, actions) => {
    const serverResult = await routeAdminApi.updateRoute(route.id, route);

    if (serverResult.error) {
      actions.setErrors(serverResult.errors);
      throw new Error();
    }
    message.success("Cập nhật thành công");

    // dispatch(setCategoryFormVisible(false));
  };

  const formRef = useRef();

  const handleSubmitClick = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  return (
    <Modal
      title={<ModalTitle title={selectedClass.id && "Cập nhật"} />}
      visible={true}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      onOk={handleSubmitClick}
      width={800}
    >
      <Formik
        initialValues={selectedClass}
        validationSchema={classValues.validationSchema}
        innerRef={formRef}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {(formikProps) => {
          const { values, errors, touched, isSubmitting, setFieldValue } =
            formikProps;
          console.log(values);
          return (
            <Form>
              <Space
                size="large"
                direction="vertical"
                style={{ width: "100%" }}
              >
                <FastField
                  name="amount"
                  component={InputField}
                  title="Số lượng"
                  titleCol={6}
                  inputCol={18}
                  isRequire={true}
                  placeholder="Ví dụ: Đường tới ETS 2021"
                />
                <Row>
                  <Col span="6">
                    <Text strong>
                      {"Ngày bắt đầu"}

                      {/* {isRequire && <Text type="danger"> *</Text>} */}
                    </Text>
                  </Col>

                  <DatePicker
                    selected={values.startDate}
                    dateFormat="dd,MM, yyyy"
                    className="form-control"
                    name="dateStart"
                    onChange={(value, e) =>
                      setFieldValue(
                        "dateStart",
                        value.format("DD/MM/yyyy")
                      ).then(console.log("eee" + value.format("DD/MM/yyyy")))
                    }
                  />
                </Row>
                <FastField
                  name="numOfLessons"
                  component={InputField}
                  title="Số bài học"
                  titleCol={6}
                  inputCol={18}
                  isRequire={true}
                  // placeholder='Ví dụ: ETS 2021'
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
                <FastField
                  name="date"
                  component={SelectedField}
                  title="Ngày"
                  options={days}
                  titleCol={6}
                  inputCol={18}
                  isRequire={true}
                />
                <FastField
                  name="description"
                  component={TextAreaField}
                  title="mô tả"
                  titleCol={6}
                  inputCol={18}
                  isRequire={true}
                />
                <FastField
                  name="routeId"
                  component={RouteSelectedField}
                  title="Route"
                  titleCol={6}
                  inputCol={18}
                  isRequire={true}
                />

                <FastField
                  name="room"
                  component={InputField}
                  title="Room"
                  titleCol={6}
                  inputCol={18}
                  heightPreview={200}
                  widthPreview={500}
                />
                <FastField
                  name="session"
                  component={InputField}
                  title="Session"
                  titleCol={6}
                  inputCol={18}
                  heightPreview={200}
                  widthPreview={500}
                />
              </Space>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
}

export default RouteAddForm;
