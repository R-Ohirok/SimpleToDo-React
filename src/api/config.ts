import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
});

instance.defaults.timeout = 2500;
instance.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';

instance.interceptors.request.use(config => {
  if (config.data) {
    config.data = snakecaseKeys(config.data, { deep: true });
  }

  return config;
});

instance.interceptors.response.use(
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

export default instance;
