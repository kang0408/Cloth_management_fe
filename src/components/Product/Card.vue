<script setup>
import { defineProps } from "vue";
const props = defineProps({
  title: String,
  price: Number,
  img: String,
  wishlist: Boolean
});
</script>
<template>
  <div class="relative flex flex-col items-center gap-6 border-1 border-[#dfdfdf] p-4">
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
      <UButton
        color="neutral"
        variant="outline"
        icon="tabler:heart"
        size="md"
        class="rounded-xs"
        v-if="!props.wishlist"
      />
      <UButton
        color="neutral"
        variant="outline"
        class="rounded-xs font-medium"
        v-if="!props.wishlist"
        >Add to Cart</UButton
      >
    </div>
    <UButton
      color="neutral"
      variant="ghost"
      icon="ix:error"
      size="xl"
      class="text-gray absolute top-1 right-1 rounded-full"
      v-if="props.wishlist"
    />
  </div>
</template>
