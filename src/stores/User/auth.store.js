import { defineStore } from "pinia";
import Cookies from "js-cookie";
import * as authService from "../../services/User/auth.service";
import * as userService from "../../services/User/user.service";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: Cookies.get("access-token") || null,
    role: null
  }),
  actions: {
    async login(email, password) {
      try {
        const data = await authService.login(email, password);
        if (data) {
          this.token = data.data.accessToken;
          this.token = data.data.role;
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
    async resetPassword(newPassword, verifyToken) {
      try {
        const res = await authService.resetPassword(newPassword, verifyToken);

        return res;
      } catch (error) {
        throw error;
      }
    },
    async getProfile() {
      try {
        const data = await userService.getProfile();

        if (data) this.role = data.data.role;

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
