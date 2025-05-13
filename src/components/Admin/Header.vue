<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/User/user.store";
import { useAuthStore } from "../../stores/User/auth.store";

const userStore = useUserStore();
const authStore = useAuthStore();
const { profile } = storeToRefs(userStore);
const router = useRouter();
const defaultAvt = "/home/cates/category-09.jpg";
const toast = useToast();
const logoutHandler = () => {
  authStore.logout();
  router.push("/");
  toast.add({ title: "Success", description: "Logout successfully", color: "success" });
};

onMounted(async () => {
  try {
    await userStore.getProfile();
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <div class="header flex min-h-22 items-center justify-end bg-white p-4">
    <div class="flex items-center gap-4" v-if="profile">
      <div class="h-14 w-14">
        <img
          :src="profile?.avatar ? profile.avatar : defaultAvt"
          alt=""
          class="h-full w-full rounded-full object-cover"
        />
      </div>
      <div class="flex flex-col">
        <p class="text-primary-500 font-medium">
          {{ profile?.username ? profile.username : "Admin" }}
        </p>
        <p class="cursor-pointer transition-all hover:font-bold" @click="logoutHandler">Logout</p>
      </div>
    </div>
  </div>
</template>
