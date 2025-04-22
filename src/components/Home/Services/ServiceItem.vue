<script setup>
import { defineProps } from "vue";

const props = defineProps({
  title: String,
  desc: String,
  icon: String
});
</script>
<template>
  <div
    class="border-gray flex w-full flex-col items-center gap-4 border-1 p-8 text-center sm:w-1/3"
  >
    <UIcon :name="props.icon" class="size-8" />
    <p class="text-xl font-bold">{{ props.title }}</p>
    <p>{{ props.desc }}</p>
  </div>
</template>
