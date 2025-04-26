<script setup>
import { ref } from "vue";
import CollectItem from "./CollectItem.vue";

const collectList = ref([
  {
    title: "Men's Fashion",
    img: "/home/collections/product-banner-02.jpg"
  },
  {
    title: "Women's Fashion",
    img: "/home/collections/product-banner-01.jpg"
  }
]);
</script>

<template>
  <div class="flex flex-col items-center px-4 sm:px-5 md:px-15 lg:px-40">
    <p class="mb-8 text-center text-4xl font-bold sm:mb-10">Collections</p>
    <div class="flex flex-col gap-4 sm:gap-5 md:flex-row md:gap-8">
      <collect-item v-for="item in collectList" :key="item.title" v-bind="item" />
    </div>
  </div>
</template>
