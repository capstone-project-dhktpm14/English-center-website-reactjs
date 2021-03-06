import { EditOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, message, Row, Space, Spin } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import courseApi from 'api/admin/courseAdminApi';
import wordApi from 'api/admin/wordAdminApi';
import ModalTitle from 'components/ModalTitle';
import ImageField from 'customfield/ImageField';
import InputField from 'customfield/InputField';
import TextAreaField from 'customfield/TextAreaField';
import UploadField from 'customfield/UploadField';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWordsByCourse } from '../../courseSlice';
import { courseValues, wordValues } from '../../initialAndValidateValues';

function WordModal(props) {
  const dispatch = useDispatch();
  const { coursesDetail } = useSelector((state) => state.course);
  const { isModalVisible, setIsModalVisible, isAddMode, initialValue, query } =
    props;

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddSlashToPronounce = (pronounce) => {
    const replaced = pronounce.replaceAll('/', '');
    return `/ ${replaced} /`;
  };

  const handleSubmit = async (values) => {
    const { id, image, sound } = values;
    const pronounce = handleAddSlashToPronounce(values.pronounce);
    const word = { ...values, pronounce };
    delete word.image;
    delete word.sound;

    let response;

    if (isAddMode) {
      response = await wordApi.addWord(word);
    } else {
      response = await wordApi.updateWord(id, word);
    }

    if (response.error) {
      const error = response.error;
      for (const property in error) {
        message.error(error[property]);
      }
    } else {
      const wordId = isAddMode ? response.id : id;

      if (image && typeof image === 'object') {
        await wordApi.updateWordImage(wordId, image);
      }
      if (sound && typeof sound === 'object') {
        await wordApi.updateWordSound(wordId, sound);
      }

      if (isAddMode) {
        await courseApi.addWordToCourse(coursesDetail.id, wordId);
      }

      message.success(`${isAddMode ? 'Th??m' : 'C???p nh???t'} th??nh c??ng`);
      handleCancel();
    }
    dispatch(fetchWordsByCourse(query));
  };

  return (
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
        validationSchema={wordValues.validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formikProps) => {
          const { values, errors, touched, isSubmitting } = formikProps;
          console.log({ values });
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
                  title="T??? v???ng"
                  titleCol={6}
                  maxLength={200}
                  inputCol={18}
                  isRequire={true}
                />
                <FastField
                  name="type"
                  component={InputField}
                  title="Lo???i t???"
                  titleCol={6}
                  maxLength={200}
                  inputCol={18}
                  isRequire={true}
                />
                <FastField
                  name="pronounce"
                  component={InputField}
                  title="Ph??t ??m"
                  titleCol={6}
                  maxLength={200}
                  inputCol={18}
                  isRequire={true}
                />
                <FastField
                  name="definition"
                  component={TextAreaField}
                  title="?????nh ngh??a"
                  maxLength={200}
                  titleCol={6}
                  inputCol={18}
                  isRequire={true}
                  rows={3}
                />
                <FastField
                  name="mean"
                  component={InputField}
                  title="Ngh??a ti???ng Vi???t"
                  titleCol={6}
                  maxLength={200}
                  inputCol={18}
                  isRequire={true}
                />
                <FastField
                  name="example"
                  component={InputField}
                  title="V?? d???"
                  titleCol={6}
                  maxLength={200}
                  inputCol={18}
                  isRequire={true}
                />
                <FastField
                  name="sound"
                  component={UploadField}
                  title="??m thanh"
                  titleCol={6}
                  inputCol={18}
                  fileType="audio/*"
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
                            <LoadingOutlined style={{ color: 'white' }} spin />
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
  );
}
WordModal.propTypes = {
  isModalVisible: PropTypes.bool,
  setIsModalVisible: PropTypes.func,
  isAddMode: PropTypes.bool,
  initialValue: PropTypes.object,
  query: PropTypes.object,
};

WordModal.defaultProps = {
  isModalVisible: false,
  setIsModalVisible: null,
  isAddMode: true,
  initialValue: courseValues.initial,
};
export default WordModal;
