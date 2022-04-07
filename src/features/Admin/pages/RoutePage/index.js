import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { Route, Routes, Switch, useRouteMatch } from 'react-router';
import MainPage from './pages/MainPage';

RoutePage.propTypes = {};

function RoutePage(props) {
  const { isLoading } = useSelector((state) => state.route);

  return (
    <Spin spinning={isLoading}>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
      </Routes>
    </Spin>
  );
}

export default RoutePage;
