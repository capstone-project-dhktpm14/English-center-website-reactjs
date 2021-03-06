import { EditOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, message, Row, Space, Spin } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import examApi from 'api/admin/examAdminApi';

import ModalTitle from 'components/ModalTitle';
import InputField from 'customfield/InputField';
import SelectedField from 'customfield/SelectField';
import UploadField from 'customfield/UploadField';

import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExams } from '../../examSlice';
import { examValues } from '../../initialAndValidateValues';

function ExamModal(props) {
  const { isModalVisible, setIsModalVisible, isAddMode, initialValue, query } =
    props;

  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.exam);

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleGetBookName = (bookId) => {
    const result = books.filter((o) => o.id === bookId);
    return result?.[0].name || '';
  };

  const handleUpdateAudio = async (audios, examId) => {
    for (const property in audios) {
      const audio = audios[property];
      if (typeof audio !== 'string') {
        await examApi.updateExamAudio(examId, audio);
      }
    }
  };

  const handleSubmit = async (values) => {
    const { id, name, bookId, part1Audio, part2Audio, part3Audio, part4Audio } =
      values;
    const audios = { part1Audio, part2Audio, part3Audio, part4Audio };
    const bookName = handleGetBookName(bookId);
    const exam = { name, bookId, bookName };

    let response;

    if (isAddMode) {
      const stts = values.stts.split(',').map((value) => +value);
      console.log('stts' + stts);
      response = await examApi.addExam(exam, stts);
    } else {
      response = await examApi.updateExam(id, exam);
    }

    if (response.error) {
      const error = response.error;
      for (const property in error) {
        message.error(error[property]);
      }
    } else {
      const examId = isAddMode ? response.id : id;
      await handleUpdateAudio(audios, examId);
      message.success(`${isAddMode ? 'Th??m' : 'C???p nh???t'} th??nh c??ng`);
      handleCancel();
    }
    dispatch(fetchExams(query));
  };

  return (
    <div id="blog-add-page">
      exam modal
      <Modal
        title={
          <ModalTitle
            title={isAddMode ? 'Th??m m???i exam' : 'C???p nh???t exam'}
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
          validationSchema={examValues.validationSchema}
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
                    title="T??n ????? thi"
                    titleCol={6}
                    maxLength={200}
                    inputCol={18}
                    isRequire={true}
                  />
                  <FastField
                    name="bookId"
                    component={SelectedField}
                    title="B??? ?????"
                    options={books.map((book) => ({
                      key: book.id,
                      value: book.name,
                    }))}
                    titleCol={6}
                    inputCol={18}
                    isRequire={true}
                  />
                  {isAddMode && (
                    <FastField
                      name="stts"
                      component={InputField}
                      title="Part 7"
                      titleCol={6}
                      maxLength={200}
                      inputCol={18}
                      isRequire={true}
                    />
                  )}
                  <FastField
                    name="part1Audio"
                    component={UploadField}
                    title="Audio part 1"
                    titleCol={6}
                    inputCol={18}
                    fileType="audio/*"
                  />
                  <FastField
                    name="part2Audio"
                    component={UploadField}
                    title="Audio part 2"
                    titleCol={6}
                    inputCol={18}
                    fileType="audio/*"
                  />
                  <FastField
                    name="part3Audio"
                    component={UploadField}
                    title="Audio part 3"
                    titleCol={6}
                    inputCol={18}
                    fileType="audio/*"
                  />
                  <FastField
                    name="part4Audio"
                    component={UploadField}
                    title="Audio part 4"
                    titleCol={6}
                    inputCol={18}
                    fileType="audio/*"
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
ExamModal.propTypes = {
  isModalVisible: PropTypes.bool,
  setIsModalVisible: PropTypes.func,
  isAddMode: PropTypes.bool,
  initialValue: PropTypes.object,
  query: PropTypes.object,
};

ExamModal.defaultProps = {
  isModalVisible: false,
  setIsModalVisible: null,
  isAddMode: true,
  initialValue: examValues.initial,
  query: {
    name: '',
    bookName: '',
    page: 0,
    size: 10,
  },
};
export default ExamModal;
