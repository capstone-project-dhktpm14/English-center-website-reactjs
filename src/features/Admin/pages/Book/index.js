import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { Route, Routes, Switch, useRouteMatch } from 'react-router';
import MainPage from './pages/MainPage';


Book.propTypes = {

};

function Book(props) {
    const { isLoading } = useSelector((state) => state.book)
    
    return (
        // <Spin spinning={isLoading}>
            <Routes>
                <Route exact path="/" element={<MainPage/>} />
            </Routes>
        // </Spin>
    );
}

export default Book;