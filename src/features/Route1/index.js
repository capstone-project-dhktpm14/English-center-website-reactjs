import { Spin } from 'antd';
import Footer from 'components/Footer';
import Header from 'components/Header';
import NotFoundPage from 'components/NotFoundPage';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useRouteMatch } from 'react-router-dom';
import RouteDetailPage from './pages/RouteDetailPage';

function Route1(props) {
  const { isLoading } = useSelector((state) => state.routeClient);

  return (
    <Spin spinning={isLoading}>
      <Header></Header>
      <div>
        <Routes>
          <Route path="/:slug" element={<RouteDetailPage />} />

          <Route element={<NotFoundPage />} />
        </Routes>
      </div>
    </Spin>
  );
}
Route1.propTypes = {};
Route1.defaultProps = {};

export default Route1;
