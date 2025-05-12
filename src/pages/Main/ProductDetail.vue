<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useClothesStore } from "../../stores/User/clothes.store";
import { useWishlistStore } from "../../stores/User/wishlist.store";
import { useCartStore } from "../../stores/User/cart.store";

const clothesStore = useClothesStore();
const wishlistStore = useWishlistStore();
const cartStore = useCartStore();
const route = useRoute();

const productDetail = ref();
const loading = ref(false);
const quantity = ref(1);
const toast = useToast();

const getDetail = async () => {
  try {
    const res = await clothesStore.getDetailCloth(route.params.id);
    if (res.success) {
      productDetail.value = clothesStore.details;
      loading.value = true;
    }
  } catch (error) {
    toast.add({ title: "Failure", description: error?.response?.data?.message, color: "error" });
    loading.value = true;
  }
};

const addWishlistHandler = async () => {
  try {
    const res = await wishlistStore.addWishlist(route.params.id);
    if (res.success) {
      toast.add({ title: "Success", description: res.message, color: "success" });
    }
  } catch (error) {
    toast.add({ title: "Failure", description: error?.response?.data?.message, color: "error" });
  }
};

const addCartHandler = async () => {
  try {
    const res = await cartStore.addCart(route.params.id, quantity.value);
    if (res.success) {
      toast.add({ title: "Success", description: res.message, color: "success" });
    }
  } catch (error) {
    toast.add({ title: "Failure", description: error?.response?.data?.message, color: "error" });
  }
};

onMounted(async () => {
  await getDetail();
});
</script>
<template>
  <div
    class="flex h-screen flex-col items-center justify-center px-4 py-15 sm:px-5 sm:py-18 md:px-15 md:py-24 lg:px-40 lg:py-26"
  >
    <p v-if="!loading">Loading...</p>
    <p v-else-if="loading && !productDetail">Not found!</p>
    <div v-else class="flex w-full flex-col gap-6 sm:flex-row">
      <div class="min-h-90 w-full flex-1">
        <img :src="productDetail.thumbnail" class="h-full w-full object-contain" />
      </div>
      <div class="text-md flex flex-3 flex-col justify-between gap-6 sm:gap-4">
        <div class="flex flex-col gap-4">
          <p class="border-b-primary-500 border-b-2 pb-2 text-3xl font-bold">
            {{ productDetail.title }}
          </p>
          <p class="text-gray">
            {{ productDetail.description }}
          </p>
          <p class="text-primary-500 text-xl font-bold">${{ productDetail.price }}</p>
          <p>
            <span class="font-bold">Remaining: </span> <span>{{ productDetail.stock }}</span>
          </p>
          <p>
            <span class="font-bold">Quantity: </span>
            <UInput v-model="quantity" class="w-10" type="number" />
          </p>
        </div>
        <div class="flex gap-4">
          <UButton class="px-4 py-2" icon="mdi:cart" @click="addCartHandler">Add to Cart</UButton>
          <UButton
            class="rounded-none px-4 py-2"
            icon="tabler:heart"
            color="neutral"
            variant="solid"
            @click="addWishlistHandler"
            >Add to Wishlist</UButton
          >
        </div>
      </div>
    </div>
  </div>
</template>
