<script setup>
import { onMounted, ref } from "vue";
import { useClothesStore } from "../../stores/User/clothes.store";

import ProductCard from "../Product/Card.vue";

const clothesStore = useClothesStore();
const productList = ref([]);
const toast = useToast();

const loadClothes = async () => {
  try {
    const res = await clothesStore.getClothes({
      limit: 6,
      page: 1,
      sortBy: "price",
      sortValue: "desc"
    });
    if (res.success) {
      productList.value = clothesStore.clothes;
    }
  } catch (error) {
    toast.add({ title: "Failure", description: error?.response?.data?.message, color: "error" });
  }
};

onMounted(async () => {
  await loadClothes();
});
</script>

<template>
  <div class="flex flex-col items-center px-4 sm:px-5 md:px-15 lg:px-40">
    <p class="mb-8 text-center text-4xl font-bold sm:mb-10">Featured Products</p>
    <div class="flex w-full flex-col gap-4 sm:flex-row sm:gap-5 md:gap-8">
      <UCarousel
        v-slot="{ item }"
        :items="productList"
        :ui="{ item: 'basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 h-96', dots: '-bottom-10' }"
        dots
      >
        <ProductCard v-bind="item" />
      </UCarousel>
    </div>
  </div>
</template>
