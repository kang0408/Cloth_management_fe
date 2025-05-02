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
  },
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
  <div>
    <p class="text-xl font-bold">My Wishlist</p>
    <p class="text-gray border-gray mb-6 border-b-1 pb-4 text-xs">
      OMG! Look at this awesome wishlist!
    </p>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4">
      <ProductCard v-for="item in productList" :key="item.title" v-bind="item" :wishlist="true" />
    </div>
    <UButton class="mt-8 w-full justify-center rounded-md lg:w-fit"> Delete wishlist </UButton>
  </div>
</template>
