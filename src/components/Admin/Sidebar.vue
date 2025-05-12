<script setup>
const navItems = [
  {
    label: "Dashboard",
    icon: "tdesign:home",
    to: "/admin/dashboard"
  },
  {
    label: "Products",
    icon: "gridicons:product",
    to: "/admin/products"
  },
  {
    label: "Users",
    icon: "lucide:users",
    to: "/admin/users"
  }
];
</script>
<template>
  <div
    class="sidebar border-primary-500 fixed top-0 bottom-0 left-0 flex h-full w-56 flex-col items-center border-r-1 bg-white p-2"
  >
    <div class="h-20 w-20">
      <img src="/logo.png" class="h-full w-full object-cover" alt="" />
    </div>
    <UNavigationMenu
      orientation="vertical"
      :items="navItems"
      highlight
      highlight-color="primary"
      :ui="{
        root: 'w-full'
      }"
    />
  </div>
</template>
