import { Col, Select, Typography } from "antd";
import React, { useState } from "react";
import PropTypes from "prop-types";
import dateUtils from "utils/dateUtils";
import "./style.scss";
const { Option } = Select;

const { Text } = Typography;

DayCustomField.propTypes = {
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

DayCustomField.defaultProps = {
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

function DayCustomField(props) {
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
  console.log("field" + JSON.stringify(field));
  const { name, value = { day: "1", month: "1", year: "2000" } } = field;
  const { day, month, year } = value;
  const [dayCustom, setDayCustom] = useState({ ...value });

  const renderDays = () => {
    let end = 31;

    const { month, year } = dayCustom;
    if (month === 4 || month === 6 || month === 9 || month === 11) end = 30;

    if (month === 2) {
      if (dateUtils.checkLeapYear(year)) end = 29;
      else end = 28;
    }

    const result = [];

    for (let i = 1; i <= end; i++) {
      result.push(<Option value={i}>{i}</Option>);
    }
    return result;
  };

  const renderMonths = () => {
    const result = [];

    for (let i = 1; i <= 12; i++) {
      result.push(
        <Option value={i} disabled={handleMonthDisabled(i)}>
          {i}
        </Option>
      );
    }
    return result;
  };

  const handleMonthDisabled = (month) => {
    const { day, year } = dayCustom;

    if (day === 31) {
      if (
        month === 2 ||
        month === 4 ||
        month === 6 ||
        month === 9 ||
        month === 11
      )
        return true;
    }

    if (day === 30 && month === 2) return true;

    if (day === 29 && month === 2 && !dateUtils.checkLeapYear(year))
      return true;
  };

  const renderYears = () => {
    const result = [];

    const yearValid = new Date().getFullYear() - 10;
    for (let i = 1950; i <= yearValid; i++) {
      result.push(<Option value={i}>{i}</Option>);
    }
    return result;
  };

  const handleDayChange = (dayValue) => {
    const valueTempt = { ...value, day: dayValue };
    setDayCustom(valueTempt);
    handleValueChange(valueTempt);
  };

  const handleMonthChange = (monthValue) => {
    const valueTempt = { ...value, month: monthValue };
    setDayCustom(valueTempt);
    handleValueChange(valueTempt);
  };

  const handleYearChange = (yearValue) => {
    const valueTempt = { ...value, year: yearValue };
    setDayCustom(valueTempt);
    handleValueChange(valueTempt);
  };

  const handleValueChange = (value) => {
    const changeEvent = {
      target: {
        name,
        value,
      },
    };

    field.onChange(changeEvent);
  };

  return (
    <div className="day-of-birth_wrapper">
        <Col span={titleCol}>
                <Text strong>
                    {title}

                    {isRequire && <Text type="danger"> *</Text>}
                </Text>
            </Col>
      <Select
        defaultValue={day}
        style={{ width: 120 }}
        onChange={handleDayChange}
      >
        {renderDays()}
      </Select>

      <Select
        defaultValue={month}
        style={{ width: 120 }}
        onChange={handleMonthChange}
      >
        {renderMonths()}
      </Select>

      <Select
        defaultValue={year}
        style={{ width: 120 }}
        onChange={handleYearChange}
      >
        {renderYears()}
      </Select>
    </div>
  );
}

export default DayCustomField;
