import axiosClient from "./axiosClient";
const BASE_URL = '/admin/classes';
const BASE_URL_SCHEDULE = '/admin/schedules';

const classAdminApi = {
    //class
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

    //Schedule
    fetchSchedules: (params,classId) => {
		return axiosClient.get(`${BASE_URL}/${classId}/schedules`, { params });
	},


    addSchedule: (schedule) => {
        return axiosClient.post(BASE_URL_SCHEDULE, schedule);
    },
    deleteSchedule: (scheduleId) => {
        return axiosClient.delete(`${BASE_URL_SCHEDULE}/${scheduleId}`);
    },

    updateSchedule: (scheduleId, schedule) => {
        return axiosClient.put(`${BASE_URL_SCHEDULE}/${scheduleId}`, schedule);
    },

};

export default classAdminApi;