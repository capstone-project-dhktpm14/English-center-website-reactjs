import { Divider, Input, message, Pagination } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

function UserPage(props) {

    return (
        <div style={{ padding: '10px 20px' }}>
            <Divider orientation="left">Quản lý người dùng</Divider>
        </div>
    );
}
export default UserPage;
