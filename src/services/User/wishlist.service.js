import api from "../../configs/axios";

export const getWishlist = async () => {
  try {
    const res = await api.get("/wishlists");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addWishlist = async (productId) => {
  try {
    const res = await api.post(`/wishlists/add/${productId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const remoteWishlist = async (productId) => {
  try {
    const res = await api.delete(`/wishlists/remove/${productId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const clearWishlist = async () => {
  try {
    const res = await api.delete("/wishlists/clear");
    return res.data;
  } catch (error) {
    throw error;
  }
};
