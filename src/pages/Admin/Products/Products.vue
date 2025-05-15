<script setup>
import { ref, onMounted, watch, h, resolveComponent } from "vue";
import { useRouter } from "vue-router";
import { useClothesStore } from "../../../stores/User/clothes.store";
import { useAdminClothesStore } from "../../../stores/Admin/clothes.store";

const UBadge = resolveComponent("UBadge");

const clothesStore = useClothesStore();
const adminClothesStore = useAdminClothesStore();
const router = useRouter();

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
const sortBy = ref("updatedAt");
const sortValue = ref("desc");
const searchString = ref("");
const loading = ref(true);

const productList = ref([]);
const toast = useToast();

const toggleModal = ref(false);
const deletedClothId = ref("");

const toggleModalHandler = (id) => {
  toggleModal.value = !toggleModal.value;
  deletedClothId.value = id;
};

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

const deleteClothHandler = async () => {
  try {
    const res = await adminClothesStore.deleteCloth(deletedClothId.value);
    if (res.success) {
      toast.add({ title: "Success", description: res.message, color: "success" });
      await loadClothes();
    }
  } catch (error) {
    toast.add({ title: "Failure", description: error?.response?.data?.message, color: "error" });
  }
  toggleModal.value = !toggleModal.value;
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
  <div class="mb-4 flex items-start justify-between">
    <div class="flex items-start gap-2">
      <div class="flex flex-row items-center gap-1">
        <p>Sort By:</p>
        <USelect v-model="sortBy" value-key="id" :items="sortByItems" class="w-fit" />
      </div>
      <div class="flex flex-row items-center gap-1">
        <p>Sort Value:</p>
        <USelect v-model="sortValue" value-key="id" :items="sortValueItems" class="w-fit" />
      </div>
    </div>
    <UButton class="rounded-xl" icon="ic:baseline-plus" @click="router.push('products/create')"
      >Create</UButton
    >
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
          icon="mdi:eye"
          color="neutral"
          variant="ghost"
          aria-label="Actions"
          @click="router.push(`products/edit/${row.original._id}`)"
        />
        <UButton
          icon="streamline:recycle-bin-2-solid"
          color="neutral"
          variant="ghost"
          aria-label="Actions"
          @click="toggleModalHandler(row.original._id)"
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
  <UModal
    title="You really want to delete this cloth?"
    v-model:open="toggleModal"
    class="w-1/3"
    :ui="{
      header: 'w-4/5'
    }"
  >
    <template #body>
      <div class="flex gap-4">
        <UButton
          color="neutral"
          label="Do it!"
          variant="solid"
          class="w-full rounded-xs"
          @click="deleteClothHandler()"
        />
        <UButton label="Hmmm..." class="w-full rounded-xs" @click="toggleModal = !toggleModal" />
      </div>
    </template>
  </UModal>
</template>
