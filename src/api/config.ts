import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import { BASE_URL } from '../constants/constants';

const api = axios.create({
  baseURL: BASE_URL,
});

api.defaults.timeout = 2500;
// api.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';

api.interceptors.request.use(config => {
  if (config.data) {
    config.data = snakecaseKeys(config.data, { deep: true });
  }

  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  response => {
    const camelcaseData = camelcaseKeys(response.data, { deep: true });

    return {
      ...response,
      data: camelcaseData,
    };
  },
  error => {
    error.response.data = camelcaseKeys(error.response.data, { deep: true });
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }

    return Promise.reject(error);
  },
);

export default api;
