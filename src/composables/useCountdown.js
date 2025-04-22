// src/composables/useCountdown.js
import { ref, onMounted, onUnmounted } from "vue";

export function useCountdown(targetDateStr) {
  const countdown = ref({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const isExpired = ref(false);
  let timer = null;

  const updateCountdown = () => {
    const now = new Date().getTime();
    const target = new Date(targetDateStr).getTime();
    const distance = target - now;

    if (distance < 0) {
      isExpired.value = true;
      clearInterval(timer);
      countdown.value = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdown.value = {
      days: String(days).padStart(2, "0"),
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0")
    };
  };

  onMounted(() => {
    updateCountdown();
    timer = setInterval(updateCountdown, 1000);
  });

  onUnmounted(() => {
    clearInterval(timer);
  });

  return {
    countdown,
    isExpired
  };
}
