<script setup>
import { ref } from "vue";

import ProductCard from "../Product/Card.vue";

const productList = ref([
  {
    title: "Smart Digital Watch",
    price: 90.0,
    img: "/home/featured/product-01.jpg"
  },
  {
    title: "Desktop Speakers",
    price: 29.0,
    img: "/home/featured/product-02.jpg"
  },
  {
    title: "Wireless Controller",
    price: 55.0,
    img: "/home/featured/product-03.jpg"
  },
  {
    title: "Wireless Headset",
    price: 28.0,
    img: "/home/featured/product-04.jpg"
  },
  {
    title: "Gear 360 Video Editor",
    price: 88.0,
    img: "/home/featured/product-06.jpg"
  },
  {
    title: "USB Flash Drive",
    price: 15.0,
    img: "/home/featured/product-08.jpg"
  },
  {
    title: "Mini Bluetooth Speaker",
    price: 29.0,
    img: "/home/featured/product-09.jpg"
  }
]);
</script>

<template>
  <div class="flex flex-col items-center px-4 sm:px-5 md:px-15 lg:px-40">
    <p class="mb-8 text-center text-4xl font-bold sm:mb-10">Featured Products</p>
    <div class="flex w-full flex-col gap-4 sm:flex-row sm:gap-5 md:gap-8">
      <UCarousel
        v-slot="{ item }"
        :items="productList"
        :ui="{ item: 'basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4', dots: '-bottom-10' }"
        dots
      >
        <ProductCard v-bind="item" />
      </UCarousel>
    </div>
  </div>
</template>
