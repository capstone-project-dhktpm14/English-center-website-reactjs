import axiosClient from "./axiosClient";
const BASE_URL = '/admin/classes';

const classAdminApi = {
    fetchClass: () => {
        return axiosClient.get('/classes');
    },

    addClass: (classes) => {
        return axiosClient.post(BASE_URL, classes);
    },
    deleteRoute: (classId) => {
        return axiosClient.delete(`${BASE_URL}/${classId}`);
    },

    updateRoute: (classId, classes) => {
        return axiosClient.put(`${BASE_URL}/${classId}`, classes);
    },
};

export default classAdminApi;