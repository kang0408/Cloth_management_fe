<script setup>
import Sidebar from "../components/Admin/Sidebar.vue";
</script>

<template>
  <div class="flex">
    <Sidebar />
    <div class="ml-56 flex-6">
      <div class="header flex items-center justify-end bg-white p-4">
        <div class="flex items-center gap-4">
          <div class="h-14 w-14">
            <img
              src="/home/cates/category-09.jpg"
              alt=""
              class="h-full w-full rounded-full object-cover"
            />
          </div>
          <div class="flex flex-col">
            <p class="text-primary-500 font-medium">Khangkhang482004</p>
            <p class="cursor-pointer transition-all hover:font-bold">Logout</p>
          </div>
        </div>
      </div>
      <div class="main h-screen bg-[#F3F4F7] p-6">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
