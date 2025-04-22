<script setup>
import { defineProps } from "vue";
const props = defineProps({
  title: String,
  img: String
});
</script>

<template>
  <div class="relative w-full md:w-1/2">
    <img :src="props.img" class="h-full w-full object-cover" />
    <div class="absolute top-1/2 left-4 -translate-y-1/2 md:left-10">
      <p class="text-md mb-6 font-bold sm:text-2xl md:text-xl lg:text-2xl">
        {{ props.title }} <br /><span class="text-primary-500">- Collection</span>
      </p>
      <UButton class="px-4 py-2 text-xs">SHOP NOW</UButton>
    </div>
  </div>
</template>
