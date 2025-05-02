import api from "../../configs/axios";

export const getProfile = async () => {
  try {
    const res = await api.get("/users/profile");

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (formData) => {
  try {
    const res = await api.patch("/users/update-profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};
