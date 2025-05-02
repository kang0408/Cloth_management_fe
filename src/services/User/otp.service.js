import api from "../../configs/axios";

export const sendOtp = async (email) => {
  try {
    const res = await api.post("/otp/send-otp", { email });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async (email, otp) => {
  try {
    const res = await api.post("/otp/verify-otp", { email, otp });
    return res.data;
  } catch (error) {
    throw error;
  }
};
