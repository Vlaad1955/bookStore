import axios from "axios";

const API_URL = "http://localhost:4000"; // Заміни на свій бекенд URL

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") { // Щоб уникнути проблем з SSR
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default axiosInstance;