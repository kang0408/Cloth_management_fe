<script setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <UApp>
    <Header />
    <div class="mt-21 sm:mt-18 lg:mt-21">
      <router-view></router-view>
    </div>
    <Footer />
  </UApp>
</template>
