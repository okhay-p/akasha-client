import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

type AuthToken = string | undefined;

const getAuthToken = (): AuthToken => {
  return Cookies.get("token");
};

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API,
});

api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();

    if (token && import.meta.env.VITE_DEV) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
