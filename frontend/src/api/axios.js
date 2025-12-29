import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers["Cache-Control"] = "no-cache";
    config.headers["Pragma"] = "no-cache";

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
