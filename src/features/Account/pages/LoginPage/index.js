import { CloseCircleOutlined, HomeOutlined } from '@ant-design/icons';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  Button,
  Col,
  Divider,
  message,
  Modal,
  Row,
  Tag,
  Typography,
} from 'antd';
import loginApi from 'api/loginApi';
import { fetchUserProfile, setLogin, setUser } from 'app/globalSlice';
import InputField from 'customfield/InputField';
import { setLoading } from 'features/Account/accountSlice';
import { loginValues } from 'features/Account/initValues';
import { FastField, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import IMAGE_ACCOUNT_PAGE from 'assets/images/account/US-ENGLISH.png';
import meApi from 'api/meApi';
import { date } from 'yup';

const { Text, Title } = Typography;

LoginPage.propTypes = {};

function LoginPage(props) {
  const dispatch = useDispatch();
  const [isError, setError] = useState(false);
  const { user, isLogin } = useSelector((state) => state.global);
  const { isLoading } = useSelector((state) => state.account);
  const history = useNavigate();

  const handleSubmit = async (values) => {
    const { username, password } = values;
    try {
      dispatch(setLoading(true));
      const { accessToken } = await loginApi.login(username, password);
      localStorage.setItem('token', accessToken);
      dispatch(setLogin(true));
      const { roles } = unwrapResult(await dispatch(fetchUserProfile()));
      console.log('role' + roles);
      const index = roles.findIndex((roleEle) => roleEle === 'ROLE_USER');

      await meApi.fetchProfile().then((data) => {
        dispatch(setUser(data));
      });
      if (index !== -1) {
        console.log('la user');
        success();
      } else {
        console.log('la admin');
        admin();
      }
    } catch (error) {
      setError(true);
    }
    dispatch(setLoading(false));
  };

  function success() {
    Modal.success({
      onOk: () => history('/'),
      onCancel: () => history('/'),
      content: 'Login success',
    });
  }

  function admin() {
    Modal.success({
      onOk: () => history('/admin'),
      onCancel: () => history('/admin'),
      content: 'Login admin success',
    });
  }
  return (
    <div className="account-common-page">
      <div className="account-wrapper">
        <div className="account_left">
          <img src={IMAGE_ACCOUNT_PAGE} alt="zelo_login" />
        </div>

        <div className="account_right">
          <Title level={2} style={{ textAlign: 'center' }}>
            <Text style={{ color: '#4d93ff' }}>Đăng Nhập</Text>
          </Title>
          <Divider />
          <div className="form-account">
            <Formik
              initialValues={{ ...loginValues.initial }}
              onSubmit={(values) => handleSubmit(values)}
              validationSchema={loginValues.validationSchema}
              enableReinitialize={true}
            >
              {(formikProps) => {
                return (
                  <Form>
                    <Row gutter={[0, 8]}>
                      <Col span={24}>
                        <FastField
                          name="username"
                          component={InputField}
                          type="text"
                          title="Tài khoản"
                          placeholder="Nhập tài khoản"
                          maxLength={50}
                          titleCol={24}
                          inputCol={24}
                        />
                      </Col>

                      <Col span={24}>
                        <FastField
                          name="password"
                          component={InputField}
                          type="password"
                          title="Mật khẩu"
                          placeholder="Nhập mật khẩu"
                          maxLength={200}
                          titleCol={24}
                          inputCol={24}
                        />
                      </Col>
                      {isError ? (
                        <Col span={24}>
                          <Tag
                            color="error"
                            style={{
                              fontWeight: 'bold',
                            }}
                            icon={<CloseCircleOutlined />}
                          >
                            Tài khoản không hợp lệ
                          </Tag>
                        </Col>
                      ) : (
                        ''
                      )}

                      <Col span={24}>
                        <br />
                        <Button type="primary" htmlType="submit" block>
                          Đăng nhập
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                );
              }}
            </Formik>
          </div>
          <Divider />
          <div className="addtional-link">
            <Link to="/">Trang chủ</Link>
            <Link to="/account/forgot">Quên mật khẩu</Link>
            <Link to="/account/registry">Bạn chưa có tài khoản ?</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
