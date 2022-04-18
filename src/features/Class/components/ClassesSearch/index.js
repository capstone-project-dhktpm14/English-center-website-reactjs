import { Col, DatePicker, Row, Select, Typography } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import commonFuc from 'utils/commonFuc';

const { Text } = Typography;
const { Option } = Select;

ClassesSearch.propTypes = {
  levels: PropTypes.array.isRequired,
  onChange: PropTypes.func,
};

ClassesSearch.defaultProps = {
  levels: [],
  onChange: null,
};

function ClassesSearch({ levels, onChange }) {
  const [levelSlug, setLevelSlug] = useState('');
  const [status, setStatus] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const handleRouteChange = (slug) => {
    setLevelSlug(slug);
  };

  const handleDateFromChange = (_, dateString) => {
    setDateFrom(dateString);
  };

  const handleDateToChange = (_, dateString) => {
    const date = commonFuc.formatDate(dateString);
    setDateTo(dateString);
  };

  useEffect(() => {
    onChange({ levelSlug, status, dateFrom, dateTo });
  }, [levelSlug, status, dateFrom, dateTo]);

  return (
    <>
      <Col xs={24} sm={24} md={24} lg={10} xl={10}>
        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Row align="middle" gutter={[8, 8]}>
              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <Text strong>Từ ngày: </Text>
              </Col>
              <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                <DatePicker
                  format="DD/MM/YYYY"
                  placeholder="dd/mm/yyyy"
                  onChange={handleDateFromChange}
                />
              </Col>
            </Row>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Row align="middle" gutter={[8, 8]}>
              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <Text strong>đến ngày: </Text>
              </Col>
              <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                <DatePicker
                  format="DD/MM/YYYY"
                  placeholder="dd/mm/yyyy"
                  onChange={handleDateToChange}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>

      <Col xs={24} sm={24} md={24} lg={10} xl={10}>
        <Row align="middle" gutter={[8, 8]}>
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <Text strong>Level: </Text>
          </Col>
          <Col xs={24} sm={24} md={18} lg={18} xl={18}>
            <Select
              defaultValue=""
              style={{ width: '80%' }}
              onChange={handleRouteChange}
            >
              <Option value={''} key={-1}>
                -- Tất cả --
              </Option>
              {levels.map((route, index) => {
                const { name, slug } = route;
                return (
                  <Option value={slug} key={index}>
                    {name}
                  </Option>
                );
              })}
            </Select>
          </Col>
        </Row>
      </Col>
    </>
  );
}

export default ClassesSearch;
