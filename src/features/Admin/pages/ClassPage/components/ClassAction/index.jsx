import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Button, Modal, Typography, message } from "antd";
import { DeleteTwoTone, EditTwoTone, InfoCircleTwoTone } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import { unwrapResult } from '@reduxjs/toolkit';
import confirm from 'antd/lib/modal/confirm';

import routeAdminApi from 'api/routeAdminApi';
import { deleteClass, setClassFormVisible, setClassUpdate } from '../../classSlice';
import classAdminApi from 'api/classAdminApi';

ClassAction.propTypes = {
    classId: PropTypes.number.isRequired,
};



function ClassAction(props) {
    const { classId } = props;
    const { classes } = useSelector((state) => state.classes);
    const dispatch = useDispatch();
    const [dataSource, setDataSource] = useState({});

    const handleUpdate = () => {
        const classe = classes.data.find(c => c.id === classId);
        console.log(classId)
        dispatch(setClassUpdate(classe));
        dispatch(setClassFormVisible(true));
    };

    const handleDelete = () => {
        confirm({

            content: "Bạn có chắc chắn xóa không ?",
            async onOk() {
                try {
                    //await routeAdminApi.deleteRoute(routeId);
                    unwrapResult(await dispatch(deleteClass({ classId })));
                    //await dispatch(deleteRoute(routeId));
                    //unwrapResult(await dispatch(deleteRoute({ routeId })));
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
        classAdminApi.fetchClass().then((res) => setDataSource(res.data))
        console.log("datasourch"+dataSource)
      }, [classes,]);
    return (
        <Dropdown 
        overlay={menu} 
        placement="bottomLeft">
            <Button type="primary" ghost>
                Thao tác
            </Button>
        </Dropdown>
    );
}

export default ClassAction;