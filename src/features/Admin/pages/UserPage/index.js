import { Spin } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect,Routes, Route, Switch, useRouteMatch } from 'react-router-dom';
import MainPage from './pages/MainPage';

User.propTypes = {};

function User(props) {
  const { isLoading } = useSelector((state) => state.course);

  return (
    <Spin spinning={isLoading}>
      <Routes>
        <Route exact path="/" element={<MainPage/>} />
      </Routes>
    </Spin>
  );
}

export default User;
