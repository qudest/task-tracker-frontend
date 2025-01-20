import axios from "axios";
import { api_routes } from "./api_routes.js";

const request = axios.create({
    baseURL: api_routes.baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

request.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default request;