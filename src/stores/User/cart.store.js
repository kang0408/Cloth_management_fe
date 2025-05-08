import { defineStore } from "pinia";
import * as cartService from "../../services/User/cart.service";

export const useCartStore = defineStore("cart", {
  state: () => ({
    products: [],
    totalPrice: null,
    totalProduct: 0
  }),
  actions: {
    async getCart() {
      try {
        const res = await cartService.getCart();
        if (res.success) {
          this.products = res.data.items;
          this.totalPrice = Number(res.data.totalPrice.toFixed(2));
          this.totalProduct = res.data.items.length;
        }
        return res;
      } catch (error) {
        this.totalProduct = 0;
        throw error;
      }
    },
    async removeCart(productId) {
      try {
        const res = await cartService.removeCart(productId);
        if (res.success) {
          this.totalProduct = res.data.items.length;
        }
        return res;
      } catch (error) {
        this.totalProduct = 0;
        throw error;
      }
    },
    async clearCart() {
      try {
        const res = await cartService.clearCart();
        if (res.success) {
          this.totalProduct = 0;
        }
        return res;
      } catch (error) {
        this.totalProduct = 0;
        throw error;
      }
    }
  }
});
