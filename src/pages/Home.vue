<script setup>
import SlideShow from "../components/Home/SlideShow.vue";
import Categories from "../components/Home/Categories/index.vue";
import Collections from "../components/Home/Collections/index.vue";
import Services from "../components/Home/Services/index.vue";
</script>

<template>
  <!-- Slider -->
  <SlideShow />
  <!-- Main -->
  <main
    class="flex flex-col gap-16 px-4 py-15 sm:gap-25 sm:px-5 sm:py-18 md:px-25 md:py-24 lg:px-40 lg:py-26"
  >
    <!-- Categories -->
    <Categories />
    <!-- Collections -->
    <Collections />
    <!-- Services -->
    <Services />
  </main>
</template>

<style lang="scss" scoped></style>
