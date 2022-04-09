import { Col, DatePicker, Divider, Dropdown, Input, Row, Select, Typography } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

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
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTO] = useState('');
  const [routeSlug, setRouteSlug] = useState('');
  const typingTimeOutRef = useRef(null);

  const handleClassChange = (checkedValues) => {
    setRouteSlug(checkedValues === 0 ? '' : checkedValues);
  };

  const handleDateFromChange = (e) => {
    const value = e.target.value;
    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current);
    }
    typingTimeOutRef.current = setTimeout(() => {
      setDateFrom(value);
    }, 500);
  };

  const handleDateToChange = (e) => {
    const value = e.target.value;
    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current);
    }
    typingTimeOutRef.current = setTimeout(() => {
      setDateTO(value);
    }, 500);
  };

  useEffect(() => {
    onChange({ routeSlug, dateFrom, dateTo });
  }, [routeSlug, dateFrom, dateTo]);

  return (
    <>
      <Col xs={0} sm={0} md={11} lg={11} xl={7}></Col>
      <Col xs={24} sm={4} md={3} lg={3} xl={3}>
        &#160;&#160;
        <Text
          strong
          style={{
            color: 'white',
            fontSize: '20px',
            textAlign: 'right',
            alignItems: 'right',
          }}
        >
          Tìm kiếm:
        </Text>
      </Col>

      <Col xs={24} sm={24} md={24} lg={12} xl={4}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Text
              strong
              style={{
                color: 'white',
                fontSize: '16px',
                textAlign: 'right',
                alignItems: 'right',
              }}
            >
              Từ ngày
            </Text>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <DatePicker
              dateFormat="dd,MM, yyyy"
              className="form-control"
              name="dateFrom"
              onChange={(value, e) =>
                setDateFrom(value.format('DD/MM/yyyy')).then(
                  console.log('eee' + value.format('DD/MM/yyyy'))
                )
              }
            />
          </Col>
        </Row>
      </Col>

      <Col xs={24} sm={24} md={24} lg={12} xl={4}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Text
              strong
              style={{
                color: 'white',
                fontSize: '16px',
                textAlign: 'right',
                alignItems: 'right',
              }}
            >
              Đến ngày
            </Text>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <DatePicker
              dateFormat="dd,MM, yyyy"
              className="form-control"
              name="dateTo"
              onChange={(value, e) =>
                setDateTO(value.format('DD/MM/yyyy')).then(
                  console.log('eee' + value.format('DD/MM/yyyy'))
                )
              }
            />
          </Col>
        </Row>
      </Col>

      <Col xs={24} sm={24} md={24} lg={12} xl={5}>
        <Select
          defaultValue=""
          style={{ width: '50%' }}
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
