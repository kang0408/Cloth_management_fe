<script setup>
import { useCountdown } from "../../composables/useCountdown";

const { countdown } = useCountdown("Aug 18, 2025 00:00:00");
</script>

<template>
  <div class="relative h-98">
    <img src="/home/limit-timer.jpg" alt="" class="h-full w-full object-cover" />
    <div class="absolute top-1/2 left-1/2 flex -translate-1/2 flex-col items-center">
      <p class="text-primary-500 text-center text-xl font-medium">
        Get <span class="text-red-500">70%</span> off to your order
      </p>
      <p class="text-center text-3xl font-bold">Limited Time Offer!</p>
      <div class="my-8 flex justify-center gap-6 sm:gap-12">
        <p class="text-center text-3xl leading-6 font-bold">
          {{ countdown.days }}<br /><span class="text-gray text-xs font-normal">DAYS</span>
        </p>
        <p class="text-center text-3xl leading-6 font-bold">
          {{ countdown.hours }}<br /><span class="text-gray text-xs font-normal">HOURS</span>
        </p>
        <p class="text-center text-3xl leading-6 font-bold">
          {{ countdown.minutes }}<br /><span class="text-gray text-xs font-normal">MINUTES</span>
        </p>
        <p class="text-center text-3xl leading-6 font-bold">
          {{ countdown.seconds }}<br /><span class="text-gray text-xs font-normal">SECONDS</span>
        </p>
      </div>
      <UButton class="inline-block px-4 py-2 text-center">SHOP NOW</UButton>
    </div>
  </div>
</template>
