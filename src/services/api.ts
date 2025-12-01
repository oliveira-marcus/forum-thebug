import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "User-Agent": "insomnia/9.3.2",
  },
  timeout: 30 * 1000,
});

api.interceptors.request.use(async (config: any) => {
   const token = localStorage.getItem('@forum:token')  
   if (token && config.headers) {
     config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
 });

export default api;
