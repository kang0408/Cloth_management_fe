<script setup>
import { ref } from "vue";

import ServiceItem from "./ServiceItem.vue";

const serviceList = ref([
  {
    title: "24/7 Free Support",
    desc: "Please feel free to contact us and we provide best service.",
    icon: "iconamoon:headphone-fill"
  },
  {
    title: "Money Back Return",
    desc: "If you are not satisfied with product then we provide refunds.",
    icon: "iconoir:dollar"
  },
  {
    title: "Free Worldwide Shipping",
    desc: "We're very pleased to be able to worldwide shipping.",
    icon: "uil:truck"
  }
]);
</script>

<template>
  <div class="flex flex-col items-center px-4 sm:px-5 md:px-15 lg:px-40">
    <p class="mb-8 text-center text-4xl font-bold sm:mb-10">Services</p>
    <div class="flex flex-col gap-4 sm:flex-row sm:gap-5 md:gap-8">
      <service-item v-for="item in serviceList" :key="item.title" v-bind="item" />
    </div>
  </div>
</template>
