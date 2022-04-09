import { Col, Result, Row } from 'antd';
import BackToTopButton from 'components/BackToTopButton';
import TopicCard from 'components/TopicCard';
import { WORDNOTE_IMAGES } from 'features/Class/constants';
import PropTypes from 'prop-types';
import React from 'react';
import ClassCard from '../ClassCard';
import './style.scss';

function ClassList(props) {
  const { classes } = props;
  const wordnoteBgs = WORDNOTE_IMAGES;

  return classes.length > 0 ? (
    <Row justify="start" height="800px" gutter={[36, 24]}>
      {classes.map((class0, index) => {
        const topic = {
          ...class0,
        };
        return (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <ClassCard classes={topic} img={wordnoteBgs[index]} />
          </Col>
        );
      })}
      <BackToTopButton />
    </Row>
  ) : (
    <Result status="404" title="Không tìm thấy" />
  );
}

ClassList.propTypes = {
  classes: PropTypes.array,
  isRegistry: PropTypes.bool,
  isStatus: PropTypes.string,
};
ClassList.defaultProps = {
  classes: [],
  isRegistry: false,
  isStatus: '',
};
export default ClassList;
