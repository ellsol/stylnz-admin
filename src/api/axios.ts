import axios from 'axios';
import { LocalStorageStore } from '@/api/token_store';
import { Token } from '@/api/models';
import { CURRENT_ENV } from '@/config/config';

const axiosInstance = axios.create({
  baseURL: CURRENT_ENV.apiBaseURL,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = new LocalStorageStore().getToken()?.token;
    if (!accessToken) {
      return config;
    }
    config.headers['Authorization'] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const refreshToken = new LocalStorageStore().getToken()?.refreshToken;
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const response = await axios.post<Token>(
        `${CURRENT_ENV.ipServiceURL}/api/v1/auth/token/refresh`,
        { refreshToken },
      );
      new LocalStorageStore().setToken(response.data);
      axios.defaults.headers.common['Authorization'] =
        `Bearer ${response.data.token}`;
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
