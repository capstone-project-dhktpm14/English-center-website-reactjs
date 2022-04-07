import axiosClient from './axiosClient';

const routeApi = {
  getRoutes: (params) => {
    const url = '/routes';
    return axiosClient.get(url, { params });
  },

  getRouteDetail: (slug) => {
    const url = `/routes/${slug}`;
    return axiosClient.get(url);
  },
};

export default routeApi;
