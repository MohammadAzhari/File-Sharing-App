import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.API_URL || "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((req) => {
  req.headers['Authorization'] = localStorage.getItem("userId");
  return req;
});

export default http;