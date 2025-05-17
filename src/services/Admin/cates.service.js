import api from "../../configs/axios";

export const getCates = async (params) => {
  try {
    const res = await api.get("/categories", { params });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getAllCates = async () => {
  try {
    const res = await api.get("/categories/all");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createCate = async (infor) => {
  try {
    const res = await api.post("/categories/create", infor);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const editCate = async (cateId, infor) => {
  try {
    const res = await api.patch(`/categories/edit/${cateId}`, infor);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCate = async (cateId) => {
  try {
    const res = await api.delete(`/categories/delete/${cateId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
