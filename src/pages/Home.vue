<script setup>
import SlideShow from "../components/Home/SlideShow.vue";
import Categories from "../components/Home/Categories/index.vue";
import Collections from "../components/Home/Collections/index.vue";
import Services from "../components/Home/Services/index.vue";
import LimitedTime from "../components/Home/LimitedTime.vue";
import FeaturedProducts from "../components/Home/Featured.vue";
</script>

<template>
  <!-- Slider -->
  <SlideShow />
  <!-- Main -->
  <main class="flex flex-col gap-16 py-15 sm:gap-25 sm:py-18 md:py-24 lg:py-26">
    <!-- Categories -->
    <Categories />
    <!-- Collections -->
    <Collections />
    <!-- Services -->
    <Services />
    <!-- Limited Time -->
    <LimitedTime />
    <!-- Featured Products -->
    <FeaturedProducts />
  </main>
</template>

<style lang="scss" scoped></style>
