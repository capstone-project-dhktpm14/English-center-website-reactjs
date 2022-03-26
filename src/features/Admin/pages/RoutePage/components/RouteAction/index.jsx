import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Button, Modal, Typography, message } from "antd";
import { DeleteTwoTone, EditTwoTone, InfoCircleTwoTone } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import { unwrapResult } from '@reduxjs/toolkit';
import confirm from 'antd/lib/modal/confirm';
import { deleteRoute, setRouteFormVisible, setRoutes, setRouteUpdate } from '../../routeSlice';
import routeAdminApi from 'api/routeAdminApi';

BookAction.propTypes = {
    bookId: PropTypes.number.isRequired,
};



function BookAction(props) {
    const { routeId } = props;
    const { routes } = useSelector((state) => state.route);
    const dispatch = useDispatch();
    const [dataSource, setDataSource] = useState({});

    const handleUpdate = () => {
        const route = routes.data.find(c => c.id === routeId);
        console.log(routeId)
        dispatch(setRouteUpdate(route));
        dispatch(setRouteFormVisible(true));
    };

    const handleDelete = () => {
        confirm({

            content: "Bạn có chắc chắn xóa không ?",
            async onOk() {
                try {
                    unwrapResult(await dispatch(deleteRoute({ routeId })));
                
                    message.success(`Xóa thành công`);
                } catch (error) {
                    message.error("Xóa thất bại");
                }
            }
        })
    }


    const menu = (
        <Menu>
            <Menu.Item onClick={handleUpdate} >
                <div className="menu-adjust--center">

                    <EditTwoTone twoToneColor='#ad8b00' />
                    <span className='menu-title'>
                        Sửa thông tin
                    </span>
                </div>
            </Menu.Item>

            <Menu.Divider />
            <Menu.Item onClick={handleDelete} >
                <div className="menu-adjust--center">

                    <DeleteTwoTone twoToneColor='#a8071a' />
                    <span className='menu-title'>Xóa</span>
                </div>
            </Menu.Item>
        </Menu>
    );


    useEffect(() => {
        routeAdminApi.fetchRoute().then((res) => setDataSource(res.data))
        console.log("datasourch"+dataSource)
      }, [routes,]);
    return (
        <Dropdown overlay={menu} placement="bottomLeft">
            <Button type="primary" ghost>
                Thao tác
            </Button>
        </Dropdown>
    );
}

export default BookAction;