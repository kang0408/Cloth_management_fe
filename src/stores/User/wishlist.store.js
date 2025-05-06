import { defineStore } from "pinia";
import * as wishlistService from "../../services/User/wishlist.service";

export const useWishlistStore = defineStore("wishlist", {
  state: () => ({
    wishlist: []
  }),
  actions: {
    async getWishlist() {
      try {
        const res = await wishlistService.getWishlist();
        if (res.success) this.wishlist = res.data.wishlist;
        return res;
      } catch (error) {
        throw error;
      }
    },
    async addWishlist(productId) {
      try {
        const res = await wishlistService.addWishlist(productId);
        return res;
      } catch (error) {
        throw error;
      }
    },
    async removeWishlist(productId) {
      try {
        const res = await wishlistService.remoteWishlist(productId);
        return res;
      } catch (error) {
        throw error;
      }
    },
    async clearWishlist() {
      try {
        const res = await wishlistService.clearWishlist();
        return res;
      } catch (error) {
        throw error;
      }
    }
  }
});
