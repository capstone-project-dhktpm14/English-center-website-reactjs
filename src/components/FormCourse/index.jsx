import { Button, Carousel, Col, Divider, Form, Row, Tag, Typography } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import InputField from "customfield/InputField";
import { registryValues } from "features/Account/initValues";
import { FastField, Formik } from "formik";
import React, { useState } from "react";
import "./style.scss";


const { Text, Title } = Typography;
function FormCourse() {
  const [isError, setError] = useState("");

  const handleRegistryCourse =()=>{
        console.log("đk tư vấn");
  }

  return (
    <div className="course-common-page">
      <div className="course-wrapper">
        <div className="course">
          <Title level={2} style={{ textAlign: "center" }}>
            <Text style={{ color: "#4d93ff" }}>ĐĂNG KÝ TƯ VẤN</Text>
          </Title>
          <Divider />
          <div className="form-account">
            <Formik
              initialValues={{ ...registryValues.initial }}
              onSubmit={(values) => handleRegistryCourse(values)}
              validationSchema={registryValues.validationSchema}
              enableReinitialize={true}
            >
              {(formikProps) => {
                return (
                  <Form>
                    <Row gutter={[0, 16]}>
                      <>
                        <Col span={24}>
                          <FastField
                            name="name"
                            component={InputField}
                            type="text"
                            placeholder="Ví dụ: Trần Hoàng Phúc"
                            maxLength={50}
                            titleCol={24}
                            inputCol={24}
                          />
                        </Col>
                        <Col span={24}>
                          <FastField
                            name="phoneNumber"
                            component={InputField}
                            type="text"
                            placeholder="Nhập SĐT đăng ký"
                            maxLength={50}
                            titleCol={24}
                            inputCol={24}
                          />
                        </Col>

                        <Col span={24}>
                          <FastField
                            name="email"
                            component={InputField}
                            type="text"
                            placeholder="Nhập email đăng ký"
                            maxLength={200}
                            titleCol={24}
                            inputCol={24}
                          />
                        </Col>

                        <Col span={24}>
                          <FastField
                            name="facility"
                            component={InputField}
                            type="text"
                            placeholder="Nhập cơ sở muốn đăng ký"
                            maxLength={200}
                            titleCol={24}
                            inputCol={24}
                          />
                        </Col>
                      </>

                      {isError ? (
                        <Col span={24}>
                          <Tag
                            color="error"
                            style={{
                              fontWeight: "bold",
                            }}
                            icon={<CloseCircleOutlined />}
                          >
                            {isError}
                          </Tag>
                        </Col>
                      ) : (
                        ""
                      )}

                      <Col span={24}>
                        <Button htmlType="submit" type="primary" block>
                          Xác nhận
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormCourse;
