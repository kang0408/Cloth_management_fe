<script setup>
import { ref, onMounted, watch, h, resolveComponent } from "vue";
import { useClothesStore } from "../../stores/User/clothes.store";

const UBadge = resolveComponent("UBadge");

const clothesStore = useClothesStore();

const sortByItems = ref([
  {
    label: "Price",
    id: "price"
  },
  {
    label: "Name",
    id: "title"
  },
  {
    label: "Stock",
    id: "stock"
  }
]);
const sortValueItems = ref([
  {
    label: "Increase",
    id: "asc"
  },
  {
    label: "Decrease",
    id: "desc"
  }
]);
const columns = [
  {
    id: "index",
    header: "#",
    cell: ({ row }) => row.index + 1
  },
  {
    accessorKey: "title",
    header: "Name"
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("price"));

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      }).format(amount);

      return h("div", { class: "font-medium" }, formatted);
    }
  },
  {
    accessorKey: "stock",
    header: "Stock"
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const color = {
        active: "success",
        inactive: "error"
      }[row.getValue("status")];

      return h(UBadge, { class: "capitalize", variant: "subtle", color }, () =>
        row.getValue("status")
      );
    }
  },
  {
    id: "action",
    header: "Action"
  }
];

const itemsPerPage = ref([5, 10, 15, 20, 25, 50]);
const itemsPerPageValue = ref(10);
const currentPage = ref(1);
const totalPages = ref(1);
const totalClothes = ref(1);
const sortBy = ref("price");
const sortValue = ref("asc");
const searchString = ref("");
const loading = ref(true);

const productList = ref([]);
const toast = useToast();

const loadClothes = async () => {
  loading.value = true;
  try {
    const res = await clothesStore.getClothes({
      limit: itemsPerPageValue.value,
      page: currentPage.value,
      sortBy: sortBy.value,
      sortValue: sortValue.value,
      search: searchString.value
    });
    if (res.success) {
      productList.value = clothesStore.clothes;
      totalPages.value = clothesStore.totalPages;
      currentPage.value = clothesStore.currentPage;
      totalClothes.value = clothesStore.totalClothes;

      loading.value = false;

      toast.add({ title: "Success", description: res.message, color: "success" });
    }
  } catch (error) {
    toast.add({ title: "Failure", description: error?.response?.data?.message, color: "error" });
    loading.value = false;
  }
};

onMounted(async () => {
  await loadClothes();
});

watch([itemsPerPageValue, currentPage, sortBy, sortValue], loadClothes);

watch(searchString, (newVal) => {
  if (newVal === "") {
    loadClothes();
  }
});
</script>

<template>
  <div class="mb-4 flex">
    <UInput
      icon="i-lucide-search"
      size="md"
      variant="outline"
      placeholder="Search product here..."
      class="w-full"
      :ui="{
        base: 'rounded-l-xl rounded-r-none border-2 border-white outline-none focus:border-primary-500 ring-0 focus:inset-shadow-none focus-visible:ring-0'
      }"
      v-model="searchString"
      @keydown.enter="loadClothes"
    />
    <UButton class="rounded-r-xl" @click="loadClothes">Search</UButton>
  </div>
  <div class="mb-4 flex items-start gap-2">
    <div class="flex flex-row items-center gap-1">
      <p>Sort By:</p>
      <USelect v-model="sortBy" value-key="id" :items="sortByItems" class="w-fit" />
    </div>
    <div class="flex flex-row items-center gap-1">
      <p>Sort Value:</p>
      <USelect v-model="sortValue" value-key="id" :items="sortValueItems" class="w-fit" />
    </div>
  </div>
  <UTable
    :loading="loading"
    loading-color="primary"
    loading-animation="carousel"
    :data="productList"
    :columns="columns"
    class="rounded-xl bg-white"
  >
    <template #title-cell="{ row }">
      <div class="flex items-center gap-3">
        <div class="h-20 w-20">
          <img
            :src="row.original ? row.original.thumbnail : ''"
            class="h-full w-full object-cover"
          />
        </div>
        <p class="text-highlighted font-medium">
          {{ row.original ? row.original.title : "" }}
        </p>
      </div>
    </template>
    <template #action-cell="{ row }">
      <div>
        <UButton
          icon="solar:pen-bold"
          color="neutral"
          variant="ghost"
          aria-label="Actions"
          @click="toggleModalHandler('remove', row.original.productId._id)"
        />
        <UButton
          icon="streamline:recycle-bin-2-solid"
          color="neutral"
          variant="ghost"
          aria-label="Actions"
          @click="toggleModalHandler('remove', row.original.productId._id)"
        />
      </div>
    </template>
  </UTable>
  <div class="mt-4 flex justify-center gap-2">
    <UPagination
      v-model:page="currentPage"
      color="neutral"
      variant="subtle"
      :sibling-count="1"
      :items-per-page="itemsPerPageValue"
      :total="totalClothes"
      :ui="{
        item: 'rounded-md'
      }"
      @change="loadClothes"
    />
    <USelect v-model="itemsPerPageValue" :items="itemsPerPage" />
  </div>
</template>
