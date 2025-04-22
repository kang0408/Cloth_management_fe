<script setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <UApp>
    <Header />
    <div>
      <router-view></router-view>
    </div>
    <Footer />
  </UApp>
</template>
