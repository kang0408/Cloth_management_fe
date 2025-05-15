<script setup>
import { watch, onMounted, ref } from "vue";
import { useClothesStore } from "../../stores/User/clothes.store";

import ProductCard from "../../components/Product/Card.vue";

const clothesStore = useClothesStore();
const value = ref([29, 75]);
const sortByItems = ref([
  {
    label: "Price",
    id: "price"
  },
  {
    label: "Name",
    id: "title"
  },
  {
    label: "Updated Time",
    id: "updatedAt"
  }
]);
const sortValueItems = ref([
  {
    label: "Increase",
    id: "asc"
  },
  {
    label: "Decrease",
    id: "desc"
  }
]);

const itemsPerPage = ref([10, 15, 20, 25, 50]);
const itemsPerPageValue = ref(10);
const currentPage = ref(1);
const totalPages = ref(1);
const totalClothes = ref(1);
const sortBy = ref("updatedAt");
const sortValue = ref("desc");
const searchString = ref("");

const productList = ref([]);
const toast = useToast();

const loading = ref(false);

const loadClothes = async () => {
  try {
    const res = await clothesStore.getClothes({
      limit: itemsPerPageValue.value,
      page: currentPage.value,
      sortBy: sortBy.value,
      sortValue: sortValue.value,
      search: searchString.value
    });
    if (res.success) {
      productList.value = clothesStore.clothes;
      totalPages.value = clothesStore.totalPages;
      currentPage.value = clothesStore.currentPage;
      totalClothes.value = clothesStore.totalClothes;

      loading.value = true;
      toast.add({ title: "Success", description: res.message, color: "success" });
    }
  } catch (error) {
    toast.add({ title: "Failure", description: error?.response?.data?.message, color: "error" });
    loading.value = true;
  }
};

onMounted(async () => {
  await loadClothes();
});

watch([itemsPerPageValue, currentPage, sortBy, sortValue], loadClothes);

watch(searchString, (newVal) => {
  if (newVal === "") {
    loadClothes();
  }
});
</script>

<template>
  <div
    class="grid grid-cols-1 gap-x-0 gap-y-6 px-4 py-15 sm:px-5 sm:py-18 md:px-15 md:py-24 lg:grid-cols-3 lg:gap-12 lg:px-40 lg:py-26"
  >
    <!-- <div class="order-1 col-span-1 grid h-fit w-full grid-cols-1 grid-rows-2 gap-6 lg:order-0">
      <div class="border-gray rounded-xs border-1 p-6">
        <p class="border-gray text-md border-b-1 pb-2 font-bold">Categories</p>
        <div>
          <p class="border-gray mt-2 pb-2 not-last:border-b-1">
            <router-link class="hover:text-primary-500" to="#">Shirts</router-link>
          </p>
          <p class="border-gray mt-2 pb-2 not-last:border-b-1">
            <router-link class="hover:text-primary-500" to="#">Jeans</router-link>
          </p>
          <p class="border-gray mt-2 pb-2 not-last:border-b-1">
            <router-link class="hover:text-primary-500" to="#">Shoes</router-link>
          </p>
          <p class="border-gray mt-2 pb-2 not-last:border-b-1">
            <router-link class="hover:text-primary-500" to="#">T-Shirts</router-link>
          </p>
        </div>
      </div>
      <div class="border-gray flex flex-col justify-between rounded-xs border-1 p-6">
        <p class="border-gray text-md border-b-1 pb-2 font-bold">Price Range</p>
        <div class="flex justify-between">
          <p>Min: {{ value[0] }}$</p>
          <p>Max: {{ value[1] }}$</p>
        </div>
        <USlider v-model="value" />
        <UButton type="submit" class="w-full justify-center rounded-md lg:w-fit"> Filter </UButton>
      </div>
    </div> -->
    <div
      class="col-span-1 grid h-fit w-full grid-rows-[1fr_1f_minmax(40rem,1fr)] gap-8 sm:col-span-3"
    >
      <div
        class="border-gray row-span-1 flex flex-col justify-between gap-4 rounded-xs border-1 p-4 sm:flex-row sm:p-6"
      >
        <div class="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
          <div class="flex w-full flex-row gap-2 sm:flex-col">
            <p class="w-1/2">Sort By:</p>
            <USelect v-model="sortBy" value-key="id" :items="sortByItems" class="w-2/3 sm:w-48" />
          </div>
          <div class="flex w-full flex-row gap-2 sm:flex-col">
            <p class="w-1/2">Sort Value:</p>
            <USelect
              v-model="sortValue"
              value-key="id"
              :items="sortValueItems"
              class="w-2/3 sm:w-48"
            />
          </div>
        </div>
        <div class="flex items-center gap-2">
          <div class="flex w-full flex-row gap-2 sm:flex-col">
            <p class="w-1/2">Items/page:</p>
            <USelect v-model="itemsPerPageValue" :items="itemsPerPage" class="w-2/3 sm:w-48" />
          </div>
        </div>
      </div>
      <div class="row-span-1 flex">
        <UInput
          icon="i-lucide-search"
          size="md"
          variant="outline"
          placeholder="Search product here..."
          class="w-full"
          :ui="{
            base: 'rounded-none border-2 border-gray outline-none focus:border-primary-500 ring-0 focus:inset-shadow-none focus-visible:ring-0'
          }"
          v-model="searchString"
          @keydown.enter="loadClothes"
        />
        <UButton @click="loadClothes">Search</UButton>
      </div>

      <div
        class="row-span-2 flex flex-col items-center gap-8"
        v-if="loading && productList.length > 0"
      >
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <ProductCard v-for="item in productList" :key="item.title" v-bind="item" />
        </div>
        <UPagination
          v-model:page="currentPage"
          color="neutral"
          variant="subtle"
          :sibling-count="1"
          :items-per-page="itemsPerPageValue"
          :total="totalClothes"
          :ui="{
            item: 'rounded-md'
          }"
          @change="loadClothes"
        />
      </div>
      <p v-else-if="!loading">Đang tải dữ liệu...</p>
      <p v-else>Danh sách trống!</p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
