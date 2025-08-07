import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const baseURL = `http://localhost:8000/api/`;

const token = Cookies.get("token");

const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${token}` },
});

let loader;
export const setAxiosLoader = (setLoader) => {
  loader = setLoader;
};

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.method !== "get" && loader) {
      loader(true);
    }
    return config;
  },
  (error) => {
    if (loader) loader(false);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (loader) loader(false);
    if (response.config.method !== "get") {
      const message = response?.data?.message || "Operation done";
      toast.success(message);
    }
    return response;
  },
  (error) => {
    if (loader) loader(false);
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    toast.error(message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
