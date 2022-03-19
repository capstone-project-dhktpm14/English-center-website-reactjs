import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { Route, Routes, Switch, useRouteMatch } from 'react-router';
import MainPage from './pages/MainPage';


ClassPage.propTypes = {

};

function ClassPage(props) {
    const { isLoading } = useSelector((state) => state.classes)
    
    return (
        <Spin spinning={isLoading}>
            <Routes>
                <Route exact path="/" element={<MainPage/>} />
            </Routes>
         </Spin>
    );
}

export default ClassPage;