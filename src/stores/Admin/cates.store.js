import { defineStore } from "pinia";

import * as catesService from "../../services/Admin/cates.service";

export const useCatesStore = defineStore("categories", {
  actions: {
    async getCates() {
      try {
        const res = await catesService.getCates();
        return res;
      } catch (error) {
        throw error;
      }
    }
  }
});
