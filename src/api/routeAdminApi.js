import axiosClient from "./axiosClient";
const BASE_URL = '/admin/routes';

const routeAdminApi = {
    fetchRoute: () => {
        return axiosClient.get('/routes');
    },

    addRoute: (route) => {
        return axiosClient.post(BASE_URL, route);
    },
    deleteRoute: (routeId) => {
        return axiosClient.delete(`${BASE_URL}/${routeId}`);
    },

    updateRoute: (routeId, route) => {
        return axiosClient.put(`${BASE_URL}/${routeId}`, route);
    },

    updateRouteImage: (routeId, image) => {
        return axiosClient.put(`${BASE_URL}/${routeId}/image`, image);
    }


};

export default routeAdminApi;