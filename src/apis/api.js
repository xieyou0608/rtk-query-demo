import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://fakestoreapi.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// 在每次發送 request 前附上 token
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ` + sessionStorage["token"];
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 攔截 http code 403 的回應
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 403) {
      alert("Permission denied!"); // Do something globally.
    }
    return Promise.reject(error);
  }
);
