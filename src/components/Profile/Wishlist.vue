<script setup>
import { onMounted, ref } from "vue";
import { useWishlistStore } from "../../stores/User/wishlist.store";

import ProductCard from "../Product/Card.vue";

const wishlistStore = useWishlistStore();
const toast = useToast();
const productList = ref([]);
const loading = ref(false);
const removeModal = ref(false);
const clearModal = ref(false);
const productId = ref("");

const getWishlist = async () => {
  try {
    const res = await wishlistStore.getWishlist();

    if (res.success) {
      toast.add({ title: "Success", description: res.message, color: "success" });
      productList.value = wishlistStore.wishlist;
      loading.value = true;
    }
  } catch (error) {
    loading.value = true;
  }
};

onMounted(async () => {
  await getWishlist();
});

const toggleRemoveModalHandler = (id) => {
  removeModal.value = !removeModal.value;
  productId.value = id;
};

const removeWishlistHandler = async () => {
  try {
    const res = await wishlistStore.removeWishlist(productId.value);

    if (res.success) {
      toast.add({ title: "Success", description: res.message, color: "success" });
      await getWishlist();
      removeModal.value = !removeModal.value;
    }
  } catch (error) {
    toast.add({ title: "Failure", description: error?.response?.data?.message, color: "error" });
    removeModal.value = !removeModal.value;
  }
};

const toggleClearModalHandler = () => {
  clearModal.value = !clearModal.value;
};

const clearWishlistHandler = async () => {
  try {
    const res = await wishlistStore.clearWishlist();

    if (res.success) {
      toast.add({ title: "Success", description: res.message, color: "success" });
      await getWishlist();
      clearModal.value = !clearModal.value;
    }
  } catch (error) {
    toast.add({ title: "Failure", description: error?.response?.data?.message, color: "error" });
    clearModal.value = !clearModal.value;
  }
};
</script>
<template>
  <div>
    <p class="text-xl font-bold">My Wishlist</p>
    <p class="text-gray border-gray mb-6 border-b-1 pb-4 text-xs">
      OMG! Look at this awesome wishlist!
    </p>
    <div
      class="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4"
      v-if="loading && productList"
    >
      <ProductCard
        v-for="item in productList"
        :key="item.title"
        v-bind="item"
        :wishlist="true"
        @toggle-modal="toggleRemoveModalHandler"
      />
    </div>
    <p v-else-if="!loading">Đang tải dữ liệu...</p>
    <p v-if="loading && productList.length == 0">Danh sách trống!</p>
    <UButton
      class="mt-8 w-full justify-center rounded-md lg:w-fit"
      @click="toggleClearModalHandler"
    >
      Clear wishlist
    </UButton>
    <!-- Remove modal -->
    <UModal
      title="Are you sure about remove this product?"
      v-model:open="removeModal"
      class="w-3/4 sm:w-1/2 lg:w-1/4"
    >
      <template #body>
        <div class="flex gap-4">
          <UButton
            color="neutral"
            label="Do it!"
            variant="solid"
            class="w-full rounded-xs"
            @click="removeWishlistHandler"
          />
          <UButton label="Hmmm..." class="w-full rounded-xs" @click="removeModal = !removeModal" />
        </div>
      </template>
    </UModal>
    <!-- Clear modal -->
    <UModal
      title="Are you sure about clear your wishlist?"
      v-model:open="clearModal"
      class="w-3/4 sm:w-1/2 lg:w-1/4"
    >
      <template #body>
        <div class="flex gap-4">
          <UButton
            color="neutral"
            label="Do it!"
            variant="solid"
            class="w-full rounded-xs"
            @click="clearWishlistHandler"
          />
          <UButton label="Hmmm..." class="w-full rounded-xs" @click="clearModal = !clearModal" />
        </div>
      </template>
    </UModal>
  </div>
</template>
