// src/app/utils/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://commulearn-node.onrender.com/api", // Update with your backend URL
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
