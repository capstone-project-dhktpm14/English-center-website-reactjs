import { unwrapResult } from "@reduxjs/toolkit";
import { Col, Modal, Row, Select } from "antd";
import meApi from "api/meApi";
import { fetchUserProfile, setAvatarProfile, setUser } from "app/globalSlice";
import UploadAvatar from "components/UploadAvatar";
import InputFieldNotTitle from "customfield/InputFieldNotTitle";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import "./style.scss";

ModalUpdateProfile.propTypes = {
  isVisible: PropTypes.bool,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  loading: PropTypes.bool,
};

ModalUpdateProfile.defaultProps = {
  isVisible: false,
  onCancel: null,
  onOk: null,
  loading: false,
};

function ModalUpdateProfile({ isVisible, onCancel, onOk, loading }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.global);
  const formRef = useRef();
  const [account, setAccount] = useState();
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState();
  const [isClear, setIsClear] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const refInitValue = useRef();

  const handleGetAvatar = (avatar) => {
    console.log("avatar", avatar);
    setAvatar(avatar);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setAccount(await meApi.fetchProfile());
    };
    fetchProfile();
  }, []);

  useEffect(async () => {
    if (isVisible) {
      setIsClear(false);
      setName(account.name);
      setAvatar(account.image);
      refInitValue.current = {
        name: name,
      };
    }
  }, [isVisible]);

  const checkChangeValue = (value1, value2) => {
    if (value1.name !== value2.name) {
      return false;
    }
    return true;
  };

  const handleCancel = () => {
    onCancel(false);
    setIsClear(true);
    setAvatar(null);
  };

  const handleSubmit = async (values) => {
    setConfirmLoading(true);

    try {
      // if (!checkChangeValue(values, refInitValue.current)) {
      //     const { name, dateOfBirth, gender } = values;
      //     await meApi.updateProfile(name, dateOfBirth, gender);

      // }
      if (avatar) {
        const frmData = new FormData();
        frmData.append("image", avatar);
        const response = await meApi.updateAvatar(frmData);
        dispatch(setAvatarProfile(response.avatar));
      }
      setIsClear(true);
    } catch (error) {
      console.log(error);
    }

    setConfirmLoading(false);

    if (onCancel) {
      onCancel();
    }
  };

  const handleOke = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  return (
    <Modal
      title="Cập nhật thông tin"
      visible={isVisible}
      onOk={handleOke}
      onCancel={handleCancel}
      width={400}
      bodyStyle={{ padding: 0 }}
      okText="Cập nhật"
      cancelText="Hủy"
      centered
      confirmLoading={confirmLoading}
    >
      <div className="profile-update_wrapper">
        <div className="profile-update_img">
          <div className="profile-update_cover-image">
            <div className="profile-update_avatar">
              <UploadAvatar
                avatar={avatar}
                getFile={handleGetAvatar}
                isClear={isClear}
              />
            </div>
          </div>
        </div>

        <div className="profile-update_info">
          <Formik
            innerRef={formRef}
            initialValues={{
              name: name,
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .required("Tên không được bỏ trống")
                .max(100, "Tên tối đa 100 kí tự"),
            })}
            enableReinitialize={true}
          >
            {(formikProps) => {
              return (
                <Form>
                  <Row gutter={[0, 16]}>
                    <Col span={24}>
                      <p>Tên </p>
                      <FastField
                        name="name"
                        component={InputFieldNotTitle}
                        type="text"
                        maxLength={100}
                      ></FastField>
                    </Col>
                  </Row>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Modal>
  );
}

export default ModalUpdateProfile;
