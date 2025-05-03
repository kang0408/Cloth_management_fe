import api from "../../configs/axios";

export const login = async (email, password) => {
  try {
    const res = await api.post("/auth/login", { email, password });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (username, email, password) => {
  try {
    const res = await api.post("/auth/register", { username, email, password, role: "user" });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (oldPassword, newPassword, verifyToken) => {
  try {
    const res = await api.post("/auth/change-password", { oldPassword, newPassword, verifyToken });
    return res.data;
  } catch (error) {
    throw error;
  }
};
