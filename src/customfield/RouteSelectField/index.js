import { Col, Row, Select, Tag, Typography } from "antd";
import routeAdminApi from "api/routeAdminApi";
import TagCustom from "components/TagCustom";
import { ErrorMessage } from "formik";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const { Text } = Typography;

const { Option } = Select;

RouteSelectedField.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array,
  isRequire: PropTypes.bool,
  titleCol: PropTypes.number,
  inputCol: PropTypes.number,
};

RouteSelectedField.defaultProps = {
  title: "",
  options: [],
  isRequire: false,
  titleCol: 24,
  inputCol: 24,
};

function RouteSelectedField({
  field,
  title,
  options,
  isRequire,
  titleCol,
  inputCol,
}) {
  const { name, value } = field;

  const handleChange = (value) => {
    const changeEvent = {
      target: {
        name: name,
        value: value,
      },
    };

    field.onChange(changeEvent);
  };
  const dataRoute=[];
  const [dataSource, setDataSource] = useState([]);
  const { routes } = useSelector((state) => state.route);
  useEffect(() => {
    routeAdminApi.fetchRoute().then((res) => setDataSource(res.data));
  }, [routes]);

  if (dataSource.length > 0) {
    dataSource.forEach((element, index) => {
      let temp = {
        key: element.name,
        value: element.id,
      };
      dataRoute.push(temp);
    });
  }

  return (
    <Row>
      <Col span={titleCol}>
        <Text strong>
          {title} {isRequire && <Text type="danger">*</Text>}
        </Text>
      </Col>
      <Col span={inputCol}>
        <Select
          defaultValue={0}
          value={value}
          onChange={handleChange}
          style={{ width: "100%" }}
        >
          <Option value={0}>-- Chọn --</Option>
          {dataRoute.map((s, index) => (
            <Option key={s.key} value={s.value}>
              {s.key}
            </Option>
          ))}
        </Select>

        <ErrorMessage name={name}>
          {(text) => <TagCustom title={text} color="error" />}
        </ErrorMessage>
      </Col>
    </Row>
  );
}

export default RouteSelectedField;
