import api from "../../configs/axios";

export const getUsers = async (params) => {
  try {
    const res = await api.get("/users", {
      params
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getProfileById = async (userId) => {
  try {
    const res = await api.get(`/users/profile/${userId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const editUser = async (userId, formData) => {
  try {
    const res = await api.patch(`/users/edit/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (infor) => {
  try {
    const res = await api.post("/users/create", infor);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const res = await api.delete(`/users/delete/${userId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
