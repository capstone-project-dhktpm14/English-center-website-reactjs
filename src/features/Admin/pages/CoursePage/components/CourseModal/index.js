import { EditOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, message, Row, Space, Spin } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import courseAdminApi from 'api/admin/courseAdminApi';
// import { courseApi } from "api";
import ModalTitle from 'components/ModalTitle';
import ImageField from 'customfield/ImageField';
import InputField from 'customfield/InputField';
import SelectedField from 'customfield/SelectField';
import TextAreaField from 'customfield/TextAreaField';
// import {
// 	ImageField,
// 	InputField,
// 	SelectedField,
// 	TextAreaField,
// } from "customfield";
// import { fetchCourses } from "features/Course/courseSlice";
// import { courseValues } from "features/Course/initialAndValidateValues";
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourse } from '../../courseSlice';
import { courseValues } from '../../initialAndValidateValues';

function CourseModal(props) {
  const dispatch = useDispatch();
  const { topics } = useSelector((state) => state.course);
  const { isModalVisible, setIsModalVisible, isAddMode, initialValue, query } =
    props;

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (values) => {
    const { id, image } = values;

    const course = { ...values };
    delete course.image;

    let response;

    if (isAddMode) {
      response = await courseAdminApi.addCourse(course);
    } else {
      response = await courseAdminApi.updateCourse(id, course);
    }

    if (response.error) {
      const error = response.error;
      for (const property in error) {
        message.error(error[property]);
      }
    } else {
      message.info(typeof image);
      if (image && typeof image === 'object') {
        const courseId = isAddMode ? response.id : id;
        await courseAdminApi.updateCourseImage(courseId, image);
      }
      message.success(`${isAddMode ? 'Th??m' : 'C???p nh???t'} th??nh c??ng`);
      handleCancel();
    }
    dispatch(fetchCourse(query));
  };

  return (
    <div id="blog-add-page">
      <Modal
        title={
          <ModalTitle
            title={isAddMode ? 'Th??m m???i' : 'C???p nh???t'}
            icon={isAddMode ? <PlusOutlined /> : <EditOutlined />}
          />
        }
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
        style={{ top: 30 }}
        width={1000}
      >
        <Formik
          initialValues={initialValue}
          validationSchema={courseValues.validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {(formikProps) => {
            const { values, errors, touched, isSubmitting } = formikProps;
            return (
              <Form>
                <Space
                  direction="vertical"
                  size="middle"
                  style={{ width: '100%' }}
                >
                  <FastField component={InputField} name="id" type="hidden" />
                  <FastField
                    name="name"
                    component={InputField}
                    title="T??n kh??a h???c"
                    titleCol={6}
                    maxLength={200}
                    inputCol={18}
                    isRequire={true}
                  />
                  <FastField
                    name="topicId"
                    component={SelectedField}
                    title="Ch??? ?????"
                    options={topics.map((topic) => ({
                      key: topic.id,
                      value: topic.name,
                    }))}
                    titleCol={6}
                    inputCol={18}
                    isRequire={true}
                  />
                  <FastField
                    name="description"
                    component={TextAreaField}
                    title="M?? t???"
                    maxLength={500}
                    titleCol={6}
                    inputCol={18}
                    isRequire={true}
                    rows={5}
                  />
                  <FastField
                    name="image"
                    component={ImageField}
                    title="???nh"
                    titleCol={6}
                    inputCol={18}
                  />
                </Space>
                <Row justify="end" style={{ marginTop: '20px' }}>
                  <Col>
                    <Space size="middle">
                      <Button onClick={handleCancel}>H???y</Button>

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
                        {isAddMode ? 'Th??m' : 'L??u'}
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
CourseModal.propTypes = {
  isModalVisible: PropTypes.bool,
  setIsModalVisible: PropTypes.func,
  isAddMode: PropTypes.bool,
  initialValue: PropTypes.object,
  query: PropTypes.object,
};

CourseModal.defaultProps = {
  isModalVisible: false,
  setIsModalVisible: null,
  isAddMode: true,
  initialValue: courseValues.initial,
};
export default CourseModal;
