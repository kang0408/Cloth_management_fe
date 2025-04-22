<script setup>
import { ref } from "vue";
import Slide01 from "../../assets/imgs/home/slide-01.jpg";
import Slide02 from "../../assets/imgs/home/slide-02.jpg";
import Slide03 from "../../assets/imgs/home/slide-03.jpg";

const items = ref([
  {
    img: Slide01,
    title: "Stylish Look",
    content: "The trends of the season"
  },
  {
    img: Slide02,
    title: "We Present",
    content: "New collections from Paris"
  },
  {
    img: Slide03,
    title: "It has finally started",
    content: "This season 25% off"
  }
]);
</script>

<template>
  <div class="h-[60vh] sm:h-[70vh] lg:h-[89vh]">
    <UCarousel
      v-slot="{ item }"
      dots
      :items="items"
      loop
      :autoplay="{ delay: 3000 }"
      :ui="{ dots: 'bottom-2' }"
    >
      <img
        :src="item.img"
        class="h-full w-full object-cover object-[55%_0] sm:object-[45%_0] lg:object-center"
      />
      <div
        class="absolute top-1/2 ml-4 w-[15rem] -translate-y-1/2 sm:ml-5 sm:w-sm md:ml-25 lg:ml-40 lg:w-xl"
      >
        <p class="text-primary-500 mb-2 text-xl font-medium sm:mb-4 sm:text-3xl lg:text-4xl">
          {{ item.title }}
        </p>
        <p class="mb-4 text-2xl font-bold sm:mb-6 sm:text-5xl lg:mb-8 lg:text-7xl">
          {{ item.content }}
        </p>
        <UButton class="px-4 py-2 sm:px-6 sm:py-4">SHOP NOW</UButton>
      </div>
    </UCarousel>
  </div>
</template>
