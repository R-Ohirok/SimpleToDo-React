import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.defaults.timeout = 2500;
api.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';

api.interceptors.request.use(config => {
  if (config.data) {
    config.data = snakecaseKeys(config.data, { deep: true });
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

    return Promise.reject(error);
  },
);

export default api;
