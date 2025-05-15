import { defineStore } from "pinia";
import * as clothesServiceAdmin from "../../services/Admin/clothes.service";

export const useAdminClothesStore = defineStore("admin-clothes", {
  actions: {
    async createCloth(formData) {
      try {
        const res = await clothesServiceAdmin.createCloth(formData);
        return res;
      } catch (error) {
        throw error;
      }
    },
    async editCloth(productId, formData) {
      try {
        const res = await clothesServiceAdmin.editCloth(productId, formData);
        return res;
      } catch (error) {
        throw error;
      }
    },
    async deleteCloth(productId) {
      try {
        const res = await clothesServiceAdmin.deleteCloth(productId);
        return res;
      } catch (error) {
        throw error;
      }
    },
    async getDetailCloth(productId) {
      try {
        const res = await clothesServiceAdmin.getDetailCloth(productId);
        return res;
      } catch (error) {
        throw error;
      }
    }
  }
});
