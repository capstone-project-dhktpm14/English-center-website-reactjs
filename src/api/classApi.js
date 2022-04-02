import axiosClient from "./axiosClient";
const BASE_URL = '/classes';

const classApi = {
    //class
    fetchClass: (params) => {
        console.log("api h "+JSON.stringify(params))
        return axiosClient.get('/classes',params);
    },

    addSchedule: (params) => {
        return axiosClient.post(`${BASE_URL}/registry`,params);
    },
    cancelSchedule: (params) => {
        return axiosClient.put(`${BASE_URL}/cancel`,params);
    },
    //Schedule
    fetchSchedules: (params) => {
		return axiosClient.get(`${BASE_URL}/schedules`, { params });
	},


};

export default classApi;