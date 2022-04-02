import React from 'react';
import PropTypes from 'prop-types';
import { Button, Result } from 'antd';
import './style.scss';
import { Link, useRouteMatch,useParams } from 'react-router-dom';

FinishPage.propTypes = {};

function FinishPage(props) {
  const params = useParams();
  // const match = useRouteMatch();
  const { examSlug, numberPart } = params;
console.log('finish',examSlug,numberPart);
  return (
    <div id="per-part-finish-page">
      <div className="main">
        <Result
          status="success"
          title="Bạn đã hoàn thành"
          extra={[
            <Button type="primary" key="console" size="large">
              <Link to={`/parts/${numberPart}`}>Làm các đề khác</Link>
            </Button>,
            <Button key="buy" size="large">
              <Link to={`/parts/test/${examSlug}/${numberPart}`}>Làm lại</Link>
            </Button>,
          ]}
        />
      </div>
    </div>
  );
}

export default FinishPage;
