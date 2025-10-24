import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://4.247.21.119:4798/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add interceptors
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // attach token if needed
//     const token = localStorage.getItem("authToken");
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // handle errors globally
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
