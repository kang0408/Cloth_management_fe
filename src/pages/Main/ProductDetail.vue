<script setup>
import { ref } from "vue";

const value = ref(1);
</script>
<template>
  <div
    class="flex flex-col gap-6 px-4 py-15 sm:flex-row sm:px-5 sm:py-18 md:px-15 md:py-24 lg:px-40 lg:py-26"
  >
    <div>
      <img src="/04_product.jpg" class="h-full w-full object-cover sm:h-1/4 sm:w-1/4" />
    </div>
    <div class="text-md flex flex-col justify-between gap-6 sm:gap-4">
      <div class="flex flex-col gap-4">
        <p class="border-b-primary-500 border-b-2 pb-2 text-3xl font-bold">USB Pen Drive</p>
        <p class="text-gray">
          Lorem ipsum dolor ut sit ame dolore adipiscing elit, sed nonumy nibh sed euismod laoreet
          dolore magna aliquarm erat volutpat Nostrud duis molestie at dolore.
        </p>
        <p class="text-primary-500 text-xl font-bold">$18.00</p>
        <p><span class="font-bold">Remaining: </span> <span>12</span></p>
        <p>
          <span class="font-bold">Quantity: </span>
          <UInput v-model="value" class="w-10" type="number" />
        </p>
      </div>
      <div class="flex gap-4">
        <UButton class="px-4 py-2" icon="mdi:cart">Add to Cart</UButton>
        <UButton class="rounded-none px-4 py-2" icon="tabler:heart" color="neutral" variant="solid"
          >Add to Wishlist</UButton
        >
      </div>
    </div>
  </div>
</template>
