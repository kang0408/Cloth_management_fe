<script setup>
import Sidebar from "../components/Admin/Sidebar.vue";
import AdminHeader from "../components/Admin/AdminHeader.vue";
</script>

<template>
  <div class="flex">
    <Sidebar />
    <div class="ml-56 flex min-h-screen flex-6 flex-col">
      <AdminHeader />
      <div class="main flex-1 bg-[#F3F4F7] p-6">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
