<script setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <UApp>
    <Header />
    <div class="mt-24">
      <router-view></router-view>
    </div>
    <Footer />
  </UApp>
</template>
