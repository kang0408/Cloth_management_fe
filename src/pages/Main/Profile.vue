<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const navLink = ref([
  {
    title: "Informations",
    to: "/profile/infor",
    icon: "i-lucide-user"
  },
  {
    title: "Wishlist",
    to: "/profile/wishlist",
    icon: "tabler:heart"
  },
  {
    title: "Change password",
    to: "/auth/change-password",
    icon: "mdi:password-outline"
  }
]);

const navigateHandler = (route) => {
  router.push(route);
};
</script>

<template>
  <div
    class="flex flex-col gap-6 px-4 py-15 sm:gap-8 sm:px-5 sm:py-18 md:flex-row md:gap-10 md:px-15 md:py-24 lg:gap-12 lg:px-40 lg:py-26"
  >
    <div class="border-gray h-fit w-full rounded-xs border-1 md:w-1/4">
      <div class="infor flex flex-col items-center p-6">
        <div class="border-gray h-24 w-24 rounded-full border-1 p-1">
          <img src="/home/cates/category-09.jpg" class="mx-auto h-full w-full rounded-full" />
        </div>
        <p class="text-md mt-2 text-center font-bold">Kangtran4804</p>
        <p class="text-gray text-center text-xs">Joined April 26, 2025</p>
      </div>
      <ul class="border-gray border-t-1">
        <li
          class="not-last:border-gray flex w-full cursor-pointer items-center gap-2 px-6 py-4 transition-all not-last:border-b-1 hover:bg-[#ededed]"
          :class="{
            'bg-primary-500 hover:bg-primary-500 text-white': item.to == route.path
          }"
          v-for="item in navLink"
          :key="item.title"
          @click="navigateHandler(item.to)"
        >
          <UIcon :name="item.icon" :size="5" />
          <p>{{ item.title }}</p>
        </li>
      </ul>
    </div>
    <div class="border-gray w-full rounded-xs border-1 p-6 md:w-3/4">
      <router-view></router-view>
    </div>
  </div>
</template>
