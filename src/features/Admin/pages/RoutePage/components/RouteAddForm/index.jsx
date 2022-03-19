
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ModalTitle from "components/ModalTitle";
import { FastField, Form, Formik } from "formik";
import InputField from "customfield/InputField";
import { useDispatch, useSelector } from 'react-redux';
import { Modal, message, Space } from 'antd';

import ImageField from 'customfield/ImageField';
import { addRoute, fetchRoutes, setRouteFormVisible } from '../../routeSlice';
import routeAdminApi from 'api/routeAdminApi';
import { routeValues } from '../../initialAndValidateValues';
import EditorField from 'customfield/EditorField';


RouteAddForm.propTypes = {

};

function RouteAddForm(props) {

    const [confirmLoading, setConfirmLoading] = useState(false);
    const { isRouteFormVisible, selectedRoute } = useSelector((state) => state.route)
    const dispatch = useDispatch();

    const handleCancel = () => {
        dispatch(setRouteFormVisible(false));
    };


    const handleSubmit = async (values, actions) => {
        setConfirmLoading(true);
        const { id, image } = values;
        const route = { ...values };

        delete route.image;

        console.log("value"+id)

        let routeIdWasSave = id;

        try {
            if (id) {
                await handleUpdate(route, actions);
                console.log("update handle");
            } else {
                routeIdWasSave = await handleAddRoute(route, actions);
                console.log("add handle");
            }
            if (image && typeof image === "object") {
                await routeAdminApi.updateRouteImage(routeIdWasSave, image);console.log("image handle");

            }

        } catch (error) {
            console.log("loi");
        };
        setConfirmLoading(false);
        message.success("Thao tác thành công");
        dispatch(setRouteFormVisible(false));
        dispatch(fetchRoutes());



    };

    const handleAddRoute = async (route, actions) => {
        const serverResult = await routeAdminApi.addRoute(route);
        if (serverResult.error) {
            actions.setErrors(serverResult.error);
            throw new Error();
        }

        // dispatch(addBook(serverResult));
        return serverResult.id;
    };


    const handleUpdate = async (route, actions) => {
        const serverResult = await routeAdminApi.updateRoute(route.id, route);

        if (serverResult.error) {
            actions.setErrors(serverResult.errors);
            throw new Error();
        }
        message.success("Cập nhật thành công");

        // dispatch(setCategoryFormVisible(false));
    }



    const formRef = useRef();

    const handleSubmitClick = () => {
        if (formRef.current) {
            formRef.current.handleSubmit();

        }
    }

    return (
        <Modal
            title={<ModalTitle title={selectedRoute.id && 'Cập nhật'} />}
            visible={true}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            onOk={handleSubmitClick}
            width={800}
        >

            <Formik
                initialValues={selectedRoute}
                validationSchema={routeValues.validationSchema}
                innerRef={formRef}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >

                {(formikProps) => {
                    const { values, errors, touched, isSubmitting } = formikProps;
                    //console.log({ values });
                    return (
                        <Form>
                            <Space size="large" direction="vertical" style={{ width: "100%" }}>
                                <FastField
                                    name='name'
                                    component={InputField}
                                    title="Tên Route"
                                    titleCol={6}
                                    inputCol={18}
                                    isRequire={true}
                                    placeholder='Ví dụ: Đường tới ETS 2021'
                                />
                                <FastField
                                    name='description'
                                    component={EditorField}
                                    title="mô tả"
                                    titleCol={6}
                                    inputCol={18}
                                    isRequire={true}
                                    // placeholder='Ví dụ: ETS 2021'
                                />
                                <FastField
                                    name='content'
                                    component={EditorField}
                                    title="nội dung"
                                    titleCol={6}
                                    inputCol={18}
                                    isRequire={true}
                                    // placeholder='Ví dụ: ETS 2021'
                                />

                                <FastField
                                    name="image"
                                    component={ImageField}
                                    title="Ảnh"
                                    titleCol={6}
                                    inputCol={18}
                                    heightPreview={200}
                                    widthPreview={500}
                                />
                            </Space>

                        </Form>
                    )
                }}
            </Formik>

        </Modal>
    );
}

export default RouteAddForm;