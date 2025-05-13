<script setup>
import Sidebar from "../components/Admin/Sidebar.vue";
import AdminHeader from "../components/Admin/Header.vue";
</script>

<template>
  <div class="flex">
    <Sidebar />
    <div class="ml-56 flex-6">
      <AdminHeader />
      <div class="main bg-[#F3F4F7] p-6">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
