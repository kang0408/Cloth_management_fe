<script setup>
import { defineProps } from "vue";
const props = defineProps({
  title: String,
  price: Number,
  img: String
});
</script>
<template>
  <div class="flex flex-col items-center gap-6 border-1 border-[#dfdfdf] p-4">
    <div class="border-b-1 border-[#dfdfdf]">
      <img :src="props.img" class="mx-auto my-0 h-full w-full object-cover" />
    </div>
    <div>
      <p
        class="hover:text-primary-500 w-50 cursor-pointer truncate overflow-hidden text-center font-bold"
      >
        {{ props.title }}
      </p>

      <p class="text-center font-medium text-black">${{ props.price }}</p>
    </div>
    <div class="flex gap-2">
      <UButton color="neutral" variant="outline" icon="tabler:heart" size="md" class="rounded-xs" />
      <UButton color="neutral" variant="outline" class="rounded-xs font-medium"
        >Add to Cart</UButton
      >
    </div>
  </div>
</template>
