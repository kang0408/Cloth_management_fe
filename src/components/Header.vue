<script setup>
import { storeToRefs } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/User/auth.store";

const authStore = useAuthStore();
const { token: authStoreToken } = storeToRefs(authStore);
const router = useRouter();
const navOptions = ref([
  [
    {
      label: "Products list",
      to: "/products"
    },
    {
      label: "About Us",
      to: "/about-us"
    },
    {
      label: "Contact Us",
      to: "/contact-us"
    }
  ]
]);

const navOptionsMobile = [
  [
    {
      label: "Products list",
      to: "/products",
      action: () => {
        router.push("/products");
      }
    },
    {
      label: "About Us",
      to: "/about-us",
      action: () => {
        router.push("/products");
      }
    },
    {
      label: "Contact Us",
      to: "/contact-us",
      action: () => {
        router.push("/products");
      }
    },
    {
      label: "User",
      slot: "user",
      children: [
        {
          label: "Profile",
          icon: "i-lucide-user",
          action: () => {
            router.push("/profile/infor");
          }
        },
        {
          label: "Wishlist",
          icon: "tabler:heart",
          action: () => {
            router.push("/profile/wishlist");
          }
        },
        {
          label: "Logout",
          icon: "material-symbols:logout-rounded",
          action: () => logoutHandler()
        }
      ]
    }
  ]
];

const filteredNavOptionsItems = computed(() => {
  return navOptionsMobile.map((group) =>
    group.filter((item) => {
      if (item.label === "User" && !authStoreToken.value) return false;
      return true;
    })
  );
});

const userOptions = ref([
  {
    label: "Profile",
    icon: "i-lucide-user",
    to: "profile/infor"
  },
  {
    label: "Wishlist",
    icon: "tabler:heart",
    to: "profile/wishlist"
  },
  {
    label: "Logout",
    icon: "material-symbols:logout-rounded",
    slot: "logout"
  }
]);

const toggleNavMobile = ref(false);

const toast = useToast();

const toggleNavMobileHandler = (label) => {
  if (label === "User") return;
  toggleNavMobile.value = !toggleNavMobile.value;
};

const logoutHandler = () => {
  authStore.logout();
  router.push("/");
  toast.add({ title: "Success", description: "Logout successfully", color: "success" });
};
</script>

<template>
  <header
    class="sticky top-0 right-0 left-0 z-30 mx-auto flex items-center justify-between gap-5 border-b-1 border-[#ccc] bg-white px-4 py-4 shadow-md sm:justify-around sm:py-2"
  >
    <!-- Logo -->
    <div class="w-14 sm:w-20">
      <router-link to="/">
        <img src="/logo.png" alt="" class="rounded-full" />
      </router-link>
    </div>
    <!-- Navigation -->
    <UNavigationMenu
      variant="link"
      :items="navOptions"
      class="hidden w-full justify-center sm:flex"
    >
      <template #item="{ item }">
        <router-link
          :to="item.to"
          :class="{
            'sm:hidden': item.label === 'User'
          }"
        >
          {{ item.label }}
        </router-link>
      </template>
    </UNavigationMenu>
    <!-- Options -->
    <div class="flex gap-2">
      <UButton size="md" v-if="!authStoreToken" @click="router.push('auth/login')"> Login </UButton>
      <div class="flex gap-2" v-else>
        <!-- User -->
        <UDropdownMenu
          :items="userOptions"
          :content="{
            sideOffset: 10
          }"
          :ui="{
            content: 'w-36 z-50'
          }"
          class="hidden sm:block"
        >
          <UButton icon="mdi:user" size="md" color="neutral" variant="link" />
          <template #logout="{ item }">
            <div class="flex gap-2">
              <div v-if="item.icon" class="cursor-pointer">
                <UIcon :name="item.icon" class="text-xl text-[#62748E]" />
              </div>
              <p @click="logoutHandler">
                {{ item.label }}
              </p>
            </div>
          </template>
        </UDropdownMenu>
        <UButton
          icon="mdi:cart"
          size="md"
          color="neutral"
          variant="link"
          @click="router.push('cart')"
        >
          <template #trailing>
            <UBadge label="44" variant="subtle" size="sm" />
          </template>
        </UButton>
      </div>
      <UModal title="Search clothing...">
        <UButton icon="i-lucide-search" size="md" color="neutral" variant="link" />
        <template #body>
          <UInput
            icon="i-lucide-search"
            size="md"
            variant="outline"
            placeholder="Enter here..."
            class="w-full"
          />
        </template>
      </UModal>
      <UButton
        icon="material-symbols:menu-rounded"
        size="xl"
        color="neutral"
        variant="link"
        class="sm:hidden"
        v-if="!toggleNavMobile"
        @click="toggleNavMobileHandler('toggle-menu')"
      />
      <UButton
        icon="material-symbols:close-rounded"
        size="xl"
        color="neutral"
        variant="link"
        class="sm:hidden"
        v-if="toggleNavMobile"
        @click="toggleNavMobileHandler('toggle-menu')"
      />
    </div>
  </header>
  <div
    class="fixed top-22 right-0 left-0 z-10 border-b-1 border-[#ccc] bg-white p-2 shadow-md sm:hidden"
    v-if="toggleNavMobile"
  >
    <UNavigationMenu :items="filteredNavOptionsItems" orientation="vertical">
      <template #item="{ item }">
        <div class="flex gap-2" @click="item.action()">
          <div v-if="item.icon" class="cursor-pointer">
            <UIcon :name="item.icon" class="text-xl" />
          </div>
          <p @click="toggleNavMobileHandler(item.label)">
            {{ item.label }}
          </p>
        </div>
      </template>
      <template #user-content="{ item }">
        <div class="flex gap-2" @click="item.action()">
          <div v-if="item.icon" class="cursor-pointer">
            <UIcon :name="item.icon" class="text-xl" />
          </div>
          <p>{{ item.label }}</p>
        </div>
      </template>
    </UNavigationMenu>
  </div>
</template>
