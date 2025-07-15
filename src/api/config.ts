import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import { BASE_URL } from '../constants/constants';

const api = axios.create({
  baseURL: BASE_URL,
});

api.defaults.timeout = 2500;

api.interceptors.request.use(config => {
  if (config.data) {
    config.data = snakecaseKeys(config.data, { deep: true });
  }

  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
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
  async error => {
    error.response.data = camelcaseKeys(error.response.data, { deep: true });

    if (error.response.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('expiresAt');
    }

    return Promise.reject(error);
  },
);

export default api;
