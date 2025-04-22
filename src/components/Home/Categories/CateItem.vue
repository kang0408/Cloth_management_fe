<script setup>
import { defineProps } from "vue";
const props = defineProps({
  img: String,
  title: String,
  cates: Array
});
</script>
<template>
  <div class="flex w-full flex-col items-center gap-2 sm:w-[46%] sm:items-start lg:w-1/4">
    <router-link to="#">
      <div class="w-full cursor-pointer">
        <img :src="props.img" class="object-fit h-full w-full" />
      </div>
    </router-link>
    <p class="hover:text-primary-500 mt-2 cursor-pointer text-lg font-bold">
      <router-link to="#">{{ props.title }}</router-link>
    </p>
    <p class="text-gray text-sx cursor-pointer sm:font-medium lg:text-sm">
      <router-link
        class="hover:text-primary-500"
        to="#"
        v-for="(item, index) in props.cates"
        :key="index"
        >{{ item }} -
      </router-link>
      <router-link class="hover:text-primary-500" to="#">More</router-link>
    </p>
  </div>
</template>
