import React, { useState } from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import { Col, Typography } from "antd";
import PropTypes from "prop-types";

const { Text } = Typography;
DayPickerField.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  isRequire: PropTypes.bool,
  disabled: PropTypes.bool,
  titleCol: PropTypes.number,
  inputCol: PropTypes.number,
  size: PropTypes.string,
};

DayPickerField.defaultProps = {
  title: "",
  type: "text",
  placeholder: "",
  maxLength: 50,
  isRequire: false,
  disabled: false,
  titleCol: 24,
  inputCol: 24,
  size: "middle",
};

function DayPickerField({ ...props }) {
  const {
    field,
    title,
    type,
    placeholder,
    maxLength,
    disabled,
    isRequire = false,
    titleCol = 8,
    inputCol = 16,
    size,
  } = props;
  const { setFieldValue } = useFormikContext();

  const [startDate, setStartDate] = useState(new Date());

  console.log("fi" + JSON.stringify(field));
  return (
    <>
      <Col span={titleCol}>
        <Text strong>
          {title}

          {isRequire && <Text type="danger"> *</Text>}
        </Text>
      </Col>
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
          setFieldValue(field.name, val);
        }}
        className="red-border"
      />
    </>
  );
}

export default DayPickerField;
