import axios from "axios";
import storage from "../utils/storage";

const serverUrl = import.meta.env.API_URL || "http://46.101.98.253:4000";

const http = axios.create({
  baseURL: serverUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((req) => {
  req.headers["Authorization"] = `Bearer ${storage.getToken()}`;
  return req;
});

export const getFileDownloadUrl = (filename: string) => {
  return `${serverUrl}/uploads/${filename}`;
};

export default http;