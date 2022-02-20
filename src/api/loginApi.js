import axiosClient from './axiosClient';



const loginApi = {
    login: (username, password) => {
        const url = '/auth/login';
        return axiosClient.post(url, { username, password });
    },
    registry: (name, username, password,phoneNumber) => {
        const url = '/auth/registry';

        return axiosClient.post(url, { name, username, password,phoneNumber });
    },
    resetOtp: (username) => {
        const url = '/auth/reset-otp';

        return axiosClient.post(url, { username });
    },
    confirmAccount: (username, otp) => {
        const url = '/auth/confirm-account';
        return axiosClient.post(url, { username, otp });
    },
    confirmPassword: (username, password, otp) => {
        const url = '/auth/confirm-password';
        return axiosClient.post(url, { username, password, otp });
    },
};

export default loginApi;