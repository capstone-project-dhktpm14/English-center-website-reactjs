import axiosClient from './axiosClient';

const routeApi = {
  getRoutes: (params) => {
    const url = '/levels';
    return axiosClient.get(url, { params });
  },

  getRouteDetail: (slug) => {
    const url = `/levels/${slug}`;
    return axiosClient.get(url);
  },
};

export default routeApi;
