<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const navOptions = ref([
  [
    {
      label: "Products list",
      to: "/products"
    },
    {
      label: "About Us"
    },
    {
      label: "Contact Us"
    }
  ]
]);

const navOptionsMobile = ref([
  [
    {
      label: "Products list",
      to: "/products"
    },
    {
      label: "About Us"
    },
    {
      label: "Contact Us"
    },
    {
      label: "User",
      slot: "user",
      children: [
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
          icon: "material-symbols:logout-rounded"
        }
      ]
    }
  ]
]);

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
    icon: "material-symbols:logout-rounded"
  }
]);

const toggleNavMobile = ref(false);

const toggleNavMobileHandler = (label) => {
  if (label === "User") return;
  toggleNavMobile.value = !toggleNavMobile.value;
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
    <UNavigationMenu :items="navOptionsMobile" orientation="vertical">
      <template #item="{ item }">
        <div v-if="item.icon" @click="handleClick(item.id)" class="cursor-pointer">
          <UIcon :name="item.icon" class="text-xl" />
        </div>
        <router-link :to="item.to" @click="toggleNavMobileHandler(item.label)">
          {{ item.label }}
        </router-link>
      </template>
    </UNavigationMenu>
  </div>
</template>
