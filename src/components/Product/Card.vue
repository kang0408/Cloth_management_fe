<script setup>
import { defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
import { useWishlistStore } from "../../stores/User/wishlist.store";

const wishlistStore = useWishlistStore();
const router = useRouter();
const props = defineProps({
  _id: String,
  title: String,
  price: Number,
  thumbnail: String,
  wishlist: Boolean
});
const emit = defineEmits();
const toast = useToast();

const getDetail = () => {
  router.push(`/products/${props._id}`);
};

const toggleModalHandler = () => {
  emit("toggleModal", props._id);
};

const addWishlistHandler = async () => {
  try {
    const res = await wishlistStore.addWishlist(props._id);
    if (res.success) {
      toast.add({ title: "Success", description: res.message, color: "success" });
    }
  } catch (error) {
    toast.add({ title: "Failure", description: error?.response?.data?.message, color: "error" });
  }
};
</script>
<template>
  <div class="relative flex flex-col items-center gap-6 border-1 border-[#dfdfdf] p-4">
    <div class="max-h-42 w-full cursor-pointer border-b-1 border-[#dfdfdf] pb-4" @click="getDetail">
      <img :src="props.thumbnail" class="mx-auto my-0 h-full w-full object-contain" />
    </div>
    <div>
      <p
        class="hover:text-primary-500 w-50 cursor-pointer truncate overflow-hidden text-center font-bold"
        @click="getDetail"
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
        @click="addWishlistHandler"
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
      class="text-gray absolute -top-5 -right-5 rounded-full"
      v-if="props.wishlist"
      @click="toggleModalHandler"
    />
  </div>
</template>
