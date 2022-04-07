import { Col, Divider, Dropdown, Input, Row, Select, Typography } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

const { Text } = Typography;
const { Option } = Select;

CourseSearch.propTypes = {
  topics: PropTypes.array.isRequired,
  onChange: PropTypes.func,
};

CourseSearch.defaultProps = {
  categories: [],
  onChange: null,
};

function CourseSearch({ topics, onChange }) {
  const [name, setName] = useState('');
  const [topicSlug, setTopicSlug] = useState('');
  const typingTimeOutRef = useRef(null);

  const handleTopicChange = (checkedValues) => {
    setTopicSlug(checkedValues === 0 ? '' : checkedValues);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current);
    }
    typingTimeOutRef.current = setTimeout(() => {
      setName(value);
    }, 500);
  };

  useEffect(() => {
    onChange({ name, topicSlug });
  }, [name, topicSlug]);

  return (
    <>
      <Divider></Divider>
      <Col xs={0} sm={0} md={11} lg={11} xl={11}></Col>
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
          Lọc Theo:
        </Text>
      </Col>
      <Col xs={24} sm={24} md={24} lg={12} xl={5}>
        <Input
          name="name"
          style={{ width: '50%' }}
          onChange={handleNameChange}
          placeholder="Tìm Theo Tên"
        />
      </Col>

      <Col xs={24} sm={24} md={24} lg={12} xl={5}>
        <Select
          defaultValue=""
          style={{ width: '50%' }}
          onChange={handleTopicChange}
        >
          <Option value="" key={-1}>
            -- Chủ Đề --
          </Option>
          {topics.map((topic, index) => {
            const { name, slug } = topic;
            return (
              <Option value={slug} key={index}>
                {name}
              </Option>
            );
          })}
        </Select>
        {/* <Dropdown placement="bottomLeft" arrow>
          {topics.map((topic, index) => {
            const { name, slug } = topic;
            return (
              <Checkbox value={slug} onChange={handleTopicChange}>
                {name}
              </Checkbox>
            );
          })}
        </Dropdown> */}
      </Col>
    </>
  );
}

export default CourseSearch;
