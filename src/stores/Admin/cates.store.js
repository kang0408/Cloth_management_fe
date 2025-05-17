import { defineStore } from "pinia";

import * as catesService from "../../services/Admin/cates.service";

export const useCatesStore = defineStore("categories", {
  actions: {
    async getCates({ limit = 10, page = 1 }) {
      try {
        const res = await catesService.getCates({ limit, page });
        return res;
      } catch (error) {
        throw error;
      }
    },
    async getAllCates() {
      try {
        const res = await catesService.getAllCates();
        return res;
      } catch (error) {
        throw error;
      }
    },
    async createCate(infor) {
      try {
        const res = await catesService.createCate(infor);
        return res;
      } catch (error) {
        throw error;
      }
    },
    async editCate(cateId, infor) {
      try {
        const res = await catesService.editCate(cateId, infor);
        return res;
      } catch (error) {
        throw error;
      }
    },
    async deleteCate(cateId) {
      try {
        const res = await catesService.deleteCate(cateId);
        return res;
      } catch (error) {
        throw error;
      }
    }
  }
});
