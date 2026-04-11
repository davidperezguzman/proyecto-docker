import axios from "axios";

const API = axios.create({
  baseURL: "https://proyecto-docker-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para enviar token automáticamente
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Manejo de errores
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default API;