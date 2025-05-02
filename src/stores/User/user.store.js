import { defineStore } from "pinia";
import * as userService from "../../services/User/user.service";

export const useUserStore = defineStore("user", {
  state: () => ({
    profile: null
  }),
  actions: {
    async getProfile() {
      try {
        const data = await userService.getProfile();

        if (data) this.profile = data.data;

        return data;
      } catch (error) {
        throw error;
      }
    },
    async updateProfile(formData) {
      try {
        const data = await userService.updateProfile(formData);

        if (data) this.profile = data.data;

        return data;
      } catch (error) {
        throw error;
      }
    }
  }
});
