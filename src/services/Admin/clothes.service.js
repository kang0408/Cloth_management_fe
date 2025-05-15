import api from "../../configs/axios";

export const createCloth = async (formData) => {
  try {
    const res = await api.post("/clothes/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const editCloth = async (formData) => {
  try {
    const res = await api.post("/clothes/edit", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCloth = async (productId) => {
  try {
    const res = await api.delete(`/clothes/delete/${productId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getDetailCloth = async (productId) => {
  try {
    const res = await api.get(`/clothes/details/${productId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
