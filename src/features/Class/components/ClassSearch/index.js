import { Col, Divider, Dropdown, Input, Row, Select, Typography } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

const { Text } = Typography;
const { Option } = Select;

ClassSearch.propTypes = {
  routes: PropTypes.array.isRequired,
  onChange: PropTypes.func,
};

ClassSearch.defaultProps = {
  routes: {},
  onChange: null,
};

function ClassSearch({ routes, onChange }) {
  const [name, setName] = useState("");
  const [routeSlug, setRouteSlug] = useState("");
  const typingTimeOutRef = useRef(null);

  const handleClassChange = (checkedValues) => {
    setRouteSlug(checkedValues === 0 ? "" : checkedValues);
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current);
    }
    typingTimeOutRef.current = setTimeout(() => {
      setName(value);
    }, 500);
  };

  useEffect(() => {
    onChange({ name, routeSlug });
  }, [name, routeSlug]);

  return (
    <>
      <Divider></Divider>
      <Col xs={0} sm={0} md={11} lg={11} xl={11}></Col>
      <Col xs={24} sm={4} md={3} lg={3} xl={3}>
        &#160;&#160;
        <Text
          strong
          style={{
            color: "white",
            fontSize: "20px",
            textAlign: "right",
            alignItems: "right",
          }}
        >
          Lọc Theo:
        </Text>
      </Col>
      <Col xs={24} sm={24} md={24} lg={12} xl={5}>
        <Select
          defaultValue=""
          style={{ width: "50%" }}
          onChange={handleClassChange}
        >
          <Option value="" key={-1}>
            -- Ngày bắt đầu --
          </Option>
          {routes.map((dateFrom, index) => {
            const { name, slug } = dateFrom;
            return (
              <Option value={slug} key={index}>
                {name}
              </Option>
            );
          })}
        </Select>
      </Col>

      <Col xs={24} sm={24} md={24} lg={12} xl={5}>
        <Select
          defaultValue=""
          style={{ width: "50%" }}
          onChange={handleClassChange}
        >
          <Option value="" key={-1}>
            -- Chủ Đề --
          </Option>
          {routes.map((route, index) => {
            const { name, slug } = route;
            return (
              <Option value={slug} key={index}>
                {name}
              </Option>
            );
          })}
        </Select>
      </Col>
    </>
  );
}

export default ClassSearch;
