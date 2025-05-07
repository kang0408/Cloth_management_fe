import { defineStore } from "pinia";
import * as clothesService from "../../services/User/clothes.service";

export const useClothesStore = defineStore("clothes", {
  state: () => ({
    clothes: [],
    details: {},
    totalPages: null,
    currentPage: null,
    totalClothes: null
  }),
  actions: {
    async getClothes({ limit = 10, page = 1, sortBy = "", sortValue = "", search = "" } = {}) {
      try {
        const res = await clothesService.getClothes({ limit, page, sortBy, sortValue, search });
        if (res.success) {
          this.clothes = res.data.clothes;
          this.totalPages = res.data.totalPages;
          this.currentPage = res.data.currentPage;
          this.totalClothes = res.data.totalClothes;
        }
        return res;
      } catch (error) {
        throw error;
      }
    },
    async getDetailCloth(productId) {
      try {
        const res = await clothesService.getDetailCloth(productId);
        return res;
      } catch (error) {
        throw error;
      }
    }
  }
});
