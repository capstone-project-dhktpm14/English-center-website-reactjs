import { message } from "antd";
import * as Yup from "yup";

export const routeValues = {
    initial: {
        name: "",
        description:"",
        content:"",
        image: ''
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("Tên không được bỏ trống"),
        description: Yup.string().required("Mô tả không được bỏ trống"),
        content: Yup.string().required("Nội dung không được bỏ trống"),
        
    }),
};

