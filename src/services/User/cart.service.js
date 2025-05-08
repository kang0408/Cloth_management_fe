import api from "../../configs/axios";

export const getCart = async () => {
  try {
    const res = await api.get("/cart");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addCart = async (productId, quantity) => {
  try {
    const res = await api.post("/cart/add", { productId, quantity });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const removeCart = async (productId) => {
  try {
    const res = await api.delete(`/cart/remove/${productId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const clearCart = async () => {
  try {
    const res = await api.delete("/cart/clear");
    return res.data;
  } catch (error) {
    throw error;
  }
};
