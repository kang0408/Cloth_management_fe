<script setup>
const toaster = {
  position: "top-right",
  expand: false,
  duration: 5000
};
</script>

<template>
  <UApp :toaster="toaster">
    <router-view></router-view>
  </UApp>
</template>
