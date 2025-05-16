import { defineStore } from "pinia";
import * as usersServiceAdmin from "../../services/Admin/users.service";

export const useAdminUsersStore = defineStore("admin-users", {
  state: () => ({
    totalPages: null,
    currentPage: null,
    totalUsers: null
  }),
  actions: {
    async getUsers({ limit = 10, page = 1, sortBy = "", sortValue = "", search = "" }) {
      try {
        const res = await usersServiceAdmin.getUsers({ limit, page, sortBy, sortValue, search });
        if (res.success) {
          this.totalPages = res.data.totalPages;
          this.currentPage = res.data.currentPage;
          this.totalUsers = res.data.totalUsers;
        }
        return res;
      } catch (error) {
        throw error;
      }
    },
    async createUser(infor) {
      try {
        const res = await usersServiceAdmin.createUser(infor);
        return res;
      } catch (error) {
        throw error;
      }
    },
    async getDetail(userId) {
      try {
        const res = await usersServiceAdmin.getProfileById(userId);
        return res;
      } catch (error) {
        throw error;
      }
    },
    async editUser(userId, formData) {
      try {
        const res = await usersServiceAdmin.editUser(userId, formData);
        return res;
      } catch (error) {
        throw error;
      }
    },
    async deleteUser(userId) {
      try {
        const res = await usersServiceAdmin.deleteUser(userId);
        return res;
      } catch (error) {
        throw error;
      }
    }
  }
});
