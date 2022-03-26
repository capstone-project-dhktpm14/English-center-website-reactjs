import { message } from "antd";
import * as Yup from "yup";

export const classValues = {
    initial: {
        amount: "",
        numOfLessons:"",
        status:"",
        description: '',
        date:'',
        routeId:'',
        room:"",
        session:"",
    },

    validationSchema: Yup.object().shape({
        amount: Yup.string().required("Amount không được bỏ trống"),
        description: Yup.string().required("Mô tả không được bỏ trống"),
        date: Yup.string().min(1,"Ngày không được bỏ trống"),
        numOfLessons:Yup.string().required("Lesson không được bỏ trống"),
        status:Yup.string().min(1,"Trạng thái không được bỏ trống"),
        session:Yup.string().required("Sesson không được bỏ trống"),
        room:Yup.string().required("Phòng không được bỏ trống"),
        routeId:Yup.number().min(1, "Route không được bỏ trống"),
        
    }),
};

export const scheduleValues = {
    initial: {
        date: "",
        description: '',
        room:'',
        session:'',
        status:"",
        classId:"",
    },

    validationSchema: Yup.object().shape({
        description: Yup.string().required("Mô tả không được bỏ trống"),
        date: Yup.string().min(1,"Ngày không được bỏ trống"),
        status:Yup.string().min(1,"Trạng thái không được bỏ trống"),
        session:Yup.string().required("Sesson không được bỏ trống"),
        room:Yup.string().required("Phòng không được bỏ trống"),
        
    }),
};



