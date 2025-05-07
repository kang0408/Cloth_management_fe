import api from "../../configs/axios";

export const getClothes = async (params) => {
  try {
    const res = await api.get("/clothes", {
      params
    });
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
