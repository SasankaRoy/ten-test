import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// create an axios instance..
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Set headers here
    config.headers["Content-Type"] = "application/json";
    config.headers["Accept"] = "application/json";

    const token = Cookies.get("session_token");
    if (token) {
      config.headers["token"] = `${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle response error
    if (error.status === 403) {
      window.location.href = "/auth/login";
      // setTimeout(() => {
      //   window.location.href = "/auth/login";
      // }, 800);
      toast.error("Un-authenticated");
      return Promise.reject(error);
    }
    // toast.error("Un-authenticated");
      // console.log("Un-authenticated",error);

    return Promise.reject(error);
  }
);

export default axiosInstance;
