import { defineStore } from "pinia";
import Cookies from "js-cookie";
import * as authService from "../../services/User/auth.service";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: Cookies.get("access-token") || null
  }),
  actions: {
    async login(email, password) {
      try {
        const data = await authService.login(email, password);
        if (data) {
          this.token = data.data.accessToken;
          Cookies.set("access-token", data.data.accessToken);
        }
      } catch (error) {
        throw error;
      }
    },
    async register(username, email, password) {
      try {
        const data = await authService.register(username, email, password);

        return data;
      } catch (error) {
        throw error;
      }
    },
    async changePassword(oldPassword, newPassword, verifyToken) {
      try {
        const data = await authService.changePassword(oldPassword, newPassword, verifyToken);

        return data;
      } catch (error) {
        throw error;
      }
    },
    logout() {
      this.token = null;
      Cookies.remove("access-token");
    }
  }
});
