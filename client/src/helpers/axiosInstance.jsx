import axios from "axios";

export const axiosInstance = axios.create({
 
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;