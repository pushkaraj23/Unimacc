import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://288612d81b97.ngrok-free.app/api/",
  baseURL: "https://api.unimacc.com/api/",
  headers: {
    "Content-Type": "application/json",
    // "ngrok-skip-browser-warning": "true",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // handle errors globally
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
