const storage = {
  getUsername: () => localStorage.getItem("username"),
  setUsername: (username: string) => localStorage.setItem("username", username),
  getToken: () => localStorage.getItem("token"),
  setToken: (token: string) => localStorage.setItem("token", token),
};

export default storage;
