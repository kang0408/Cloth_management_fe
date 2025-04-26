<script setup>
import { ref } from "vue";

import CateItem from "./CateItem.vue";

const cateList = ref([
  {
    img: "/home/cates/category-09.jpg",
    title: "MEN",
    cates: ["Jackets", "Jeans"]
  },
  {
    img: "/home/cates/category-10.jpg",
    title: "FOOTWEAR",
    cates: ["Shoes", "Sandals"]
  },
  {
    img: "/home/cates/category-11.jpg",
    title: "WOMEN",
    cates: ["T-shirt", "Jeans"]
  },
  {
    img: "/home/cates/category-12.jpg",
    title: "ACCESSORIES",
    cates: ["Mirror", "Jewellery"]
  }
]);
</script>

<template>
  <div class="flex flex-col items-center px-4 sm:px-5 md:px-15 lg:px-40">
    <p class="mb-8 text-center text-4xl font-bold sm:mb-10">Categories</p>
    <div
      class="flex flex-col gap-8 sm:flex-row sm:flex-wrap sm:justify-between lg:flex-nowrap lg:justify-normal"
    >
      <cate-item v-for="item in cateList" :key="item.title" v-bind="item" />
    </div>
  </div>
</template>
