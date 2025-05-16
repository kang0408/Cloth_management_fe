<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../../stores/User/user.store";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { profile } = storeToRefs(userStore);
const route = useRoute();
const router = useRouter();

const defaultAvt = "/home/cates/category-09.jpg";
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

const toast = useToast();
onMounted(async () => {
  try {
    const res = await userStore.getProfile();

    if (res) {
      toast.add({ title: "Success", description: res.message, color: "success" });
    }
  } catch (error) {
    toast.add({ title: "Failure", description: "Get profile failure", color: "success" });
  }
});
</script>

<template>
  <div
    class="flex flex-col gap-6 px-4 py-15 sm:gap-8 sm:px-5 sm:py-18 md:flex-row md:gap-10 md:px-15 md:py-24 lg:gap-12 lg:px-40 lg:py-26"
  >
    <div class="border-gray h-fit w-full rounded-xs border-1 md:w-1/4">
      <div class="infor flex flex-col items-center p-6">
        <div class="border-gray h-40 w-40 rounded-full border-1 p-1">
          <img
            :src="profile?.avatar ? profile.avatar : defaultAvt"
            class="mx-auto h-full w-full rounded-full object-cover"
          />
        </div>
        <div v-if="profile">
          <p class="text-md mt-2 text-center font-bold">{{ profile.username }}</p>
          <p class="text-gray text-center text-xs">
            {{ new Date(profile.createdAt).toISOString() }}
          </p>
        </div>
        <p v-else>Đang tải dữ liệu...</p>
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
    <div
      class="border-gray flex w-full items-center justify-center rounded-xs border-1 p-6 md:w-3/4"
    >
      <router-view v-if="userStore.profile" class="flex-1"></router-view>
      <p v-else>Đang tải dữ liệu...</p>
    </div>
  </div>
</template>
