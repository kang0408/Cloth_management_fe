<template>
  <div
    class="auth-layout relative flex h-screen items-center justify-center bg-[url('/auth/background.jpg')] bg-cover bg-center px-6 sm:px-0"
  >
    <div
      class="absolute top-0 right-0 bottom-0 left-0 z-10 rounded-xl bg-white/20 p-8 backdrop-blur-md"
    ></div>
    <router-view class="relative z-30"></router-view>
  </div>
</template>
