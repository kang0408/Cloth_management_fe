<script setup>
import { ref } from "vue";

import ProductCard from "../../components/Product/Card.vue";

const value = ref([29, 75]);

const items = ref([
  {
    label: "Backlog",
    id: "backlog"
  },
  {
    label: "Todo",
    id: "todo"
  },
  {
    label: "In Progress",
    id: "in_progress"
  },
  {
    label: "Done",
    id: "done"
  }
]);
const selectValue = ref("backlog");

const itemsPerPage = ref([10, 15, 20, 25, 50]);
const itemsPerPageValue = ref(10);

const productList = ref([
  {
    title: "Smart Digital Watch",
    price: 90.0,
    img: "/home/featured/product-01.jpg"
  },
  {
    title: "Desktop Speakers",
    price: 29.0,
    img: "/home/featured/product-02.jpg"
  },
  {
    title: "Wireless Controller",
    price: 55.0,
    img: "/home/featured/product-03.jpg"
  },
  {
    title: "Wireless Headset",
    price: 28.0,
    img: "/home/featured/product-04.jpg"
  },
  {
    title: "Gear 360 Video Editor",
    price: 88.0,
    img: "/home/featured/product-06.jpg"
  },
  {
    title: "USB Flash Drive",
    price: 15.0,
    img: "/home/featured/product-08.jpg"
  },
  {
    title: "Mini Bluetooth Speaker",
    price: 29.0,
    img: "/home/featured/product-09.jpg"
  },
  {
    title: "Smart Digital Watch",
    price: 90.0,
    img: "/home/featured/product-01.jpg"
  },
  {
    title: "Desktop Speakers",
    price: 29.0,
    img: "/home/featured/product-02.jpg"
  },
  {
    title: "Wireless Controller",
    price: 55.0,
    img: "/home/featured/product-03.jpg"
  },
  {
    title: "Wireless Headset",
    price: 28.0,
    img: "/home/featured/product-04.jpg"
  },
  {
    title: "Gear 360 Video Editor",
    price: 88.0,
    img: "/home/featured/product-06.jpg"
  },
  {
    title: "USB Flash Drive",
    price: 15.0,
    img: "/home/featured/product-08.jpg"
  },
  {
    title: "Mini Bluetooth Speaker",
    price: 29.0,
    img: "/home/featured/product-09.jpg"
  }
]);

const page = ref(5);
</script>

<template>
  <div
    class="grid grid-cols-1 gap-x-0 gap-y-6 px-4 py-15 sm:px-5 sm:py-18 md:px-15 md:py-24 lg:grid-cols-4 lg:gap-12 lg:px-40 lg:py-26"
  >
    <div class="order-1 col-span-1 grid h-fit w-full grid-cols-1 grid-rows-2 gap-6 lg:order-0">
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
    </div>
    <div
      class="col-span-1 grid h-fit w-full grid-rows-[1fr_1f_minmax(40rem,1fr)] gap-8 sm:col-span-3"
    >
      <div
        class="border-gray row-span-1 flex flex-col justify-between gap-4 rounded-xs border-1 p-6 sm:flex-row"
      >
        <div class="flex items-center gap-2">
          <p>Sort By:</p>
          <USelect v-model="selectValue" value-key="id" :items="items" class="w-36 sm:w-48" />
        </div>
        <div class="flex items-center gap-2">
          <p>Items per page:</p>
          <USelect v-model="itemsPerPageValue" :items="itemsPerPage" class="w-24 sm:w-48" />
        </div>
      </div>
      <div class="row-span-1">
        <UInput
          icon="i-lucide-search"
          size="md"
          variant="outline"
          placeholder="Search product here..."
          class="w-full"
        />
      </div>

      <div class="row-span-2 flex flex-col items-center gap-8">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <ProductCard v-for="item in productList" :key="item.title" v-bind="item" />
        </div>
        <UPagination
          v-model:page="page"
          color="neutral"
          variant="subtle"
          :sibling-count="1"
          :items-per-page="10"
          :total="100"
          :ui="{
            item: 'rounded-md'
          }"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
