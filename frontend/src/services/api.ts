import http from "../config/config";

const api = {
  signup: async (data: { username: string; password: string }) =>
    handler(http.post("/api/auth/signup", data)),
  login: async (data: { username: string; password: string }) =>
    handler(http.post("/api/auth/login", data)),
  listFiles: async () => handler(http.get("/api/files/list")),
  uploadFile: async (data: FormData) =>
    handler(
      http.post("/api/files/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ),
  getFile: async (fileId: string) =>
    handler(http.get(`/api/files/view/${fileId}`)),
};

export const handler = async (req: Promise<{ data: any }>) => {
  try {
    const { data } = await req;
    return data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

export default api;
