import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  timeout: 60000,
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig<any>) => {
    // console.log(config);
    if (config.headers !== undefined) {
      const token = "";
      if (token) {
        config.headers.Authorization = "Bearer " + token;
      }
    }
    return config;
  }
);

export default axiosInstance;
