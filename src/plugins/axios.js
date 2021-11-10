import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:7500" });

axiosInstance.interceptors.response.use(
    (res) => res,
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
