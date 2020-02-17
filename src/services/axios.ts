import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: window._env_.API_URL as any,
  timeout: 5000,
  withCredentials: true
});

export default axiosInstance;
