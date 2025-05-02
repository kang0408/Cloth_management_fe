import { defineStore } from "pinia";
import * as OtpService from "../../services/User/otp.service";

export const useOtpStore = defineStore("otp", {
  state: () => ({
    verifyToken: null
  }),
  actions: {
    async sendOtp(email) {
      try {
        const res = await OtpService.sendOtp(email);
        return res;
      } catch (error) {
        throw error;
      }
    },
    async verifyOtp(email, otp) {
      try {
        const res = await OtpService.verifyOtp(email, otp);

        console.log(res);
        if (res) this.verifyToken = res.data.verifyToken;
        return res;
      } catch (error) {
        throw error;
      }
    }
  }
});
