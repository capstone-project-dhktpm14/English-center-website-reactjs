import axiosClient from './axiosClient';

const meApi = {
    fetchProfile: () => {
        const url = '/me';
        return axiosClient.get(url);
    },
    updateAvatar: (file) => {
        const url = '/me/image';
        return axiosClient.put(url, file);
    },
};

export default meApi;