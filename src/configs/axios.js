import axios from "axios";
import Cookies from "js-cookie";
import router from "../routers/index.router";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/v1`
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access-token");

    if (token) config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // router.push("/auth/login");
        console.log("Unauthorized");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
