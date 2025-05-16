import api from "../../configs/axios";

export const getCates = async () => {
  try {
    const res = await api.get("/categories");
    return res.data;
  } catch (error) {
    throw error;
  }
};
