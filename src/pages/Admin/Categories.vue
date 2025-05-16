<script setup>
import { reactive, ref, onMounted, watch, h, resolveComponent } from "vue";
import { useRouter } from "vue-router";
import { useCatesStore } from "../../stores/Admin/cates.store";
const UBadge = resolveComponent("UBadge");

const UButton = resolveComponent("UButton");
const cateStore = useCatesStore();
const router = useRouter();

const selectStatus = ref([
  {
    label: "Active",
    value: "active"
  },
  {
    label: "Inactive",
    value: "inactive"
  }
]);
const columns = [
  {
    id: "expand",
    cell: ({ row }) => {
      const hasSubCategories = row.original.subCategories?.length > 0;

      if (!hasSubCategories) return null;

      return h(UButton, {
        color: "neutral",
        variant: "ghost",
        icon: "i-lucide-chevron-down",
        square: true,
        "aria-label": "Expand",
        ui: {
          leadingIcon: [
            "transition-transform",
            row.getIsExpanded() ? "duration-200 rotate-180" : ""
          ]
        },
        onClick: () => row.toggleExpanded()
      });
    }
  },
  {
    id: "index",
    header: "#",
    cell: ({ row }) => row.index + 1
  },
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "description",
    header: "Description"
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

const cate = reactive({
  name: "",
  description: "",
  status: "active"
});

const expanded = ref();
const itemsPerPage = ref([5, 10, 15, 20, 25, 50]);
const itemsPerPageValue = ref(10);
const currentPage = ref(1);
const totalPages = ref(1);
const totalCates = ref(1);
const loading = ref(true);

const catesList = ref([]);
const toast = useToast();

const toggleModal = ref(false);
const deletedClothId = ref("");

const toggleModalHandler = (id) => {
  toggleModal.value = !toggleModal.value;
  deletedClothId.value = id;
};

const loadCates = async () => {
  loading.value = true;
  try {
    const res = await cateStore.getCates({
      limit: itemsPerPageValue.value,
      page: currentPage.value
    });
    if (res.success) {
      catesList.value = res.data.cates;
      totalPages.value = res.data.totalPages;
      currentPage.value = res.data.currentPage;
      totalCates.value = res.data.totalCates;

      loading.value = false;

      toast.add({ title: "Success", description: res.message, color: "success" });
    }
  } catch (error) {
    toast.add({ title: "Failure", description: error?.response?.data?.message, color: "error" });
    loading.value = false;
  }
};

const validate = (cate) => {
  const errors = [];
  if (!cate.name) errors.push({ name: "name", message: "Category name is required" });
  return errors;
};

const deleteClothHandler = async () => {
  try {
    const res = await adminClothesStore.deleteCloth(deletedClothId.value);
    if (res.success) {
      toast.add({ title: "Success", description: res.message, color: "success" });
      await loadCates();
    }
  } catch (error) {
    toast.add({ title: "Failure", description: error?.response?.data?.message, color: "error" });
  }
  toggleModal.value = !toggleModal.value;
};

onMounted(async () => {
  await loadCates();
});

watch([itemsPerPageValue, currentPage], loadCates);
</script>

<template>
  <div class="grid grid-cols-3 gap-4">
    <div class="col-span-2">
      <UTable
        :loading="loading"
        loading-color="primary"
        loading-animation="carousel"
        v-model:expanded="expanded"
        :data="catesList"
        :columns="columns"
        class="rounded-xl bg-white"
      >
        <template #expanded="{ row }">
          <UTable
            :loading="loading"
            loading-color="primary"
            loading-animation="carousel"
            :data="row.original.subCategories"
            :columns="columns"
            class="rounded-xl bg-white"
          >
            <template #action-cell="{ row }">
              <div>
                <UButton
                  icon="solar:pen-bold"
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
        </template>
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
          :total="totalCates"
          :ui="{
            item: 'rounded-md'
          }"
          @change="loadCates"
        />
        <USelect v-model="itemsPerPageValue" :items="itemsPerPage" />
      </div>
    </div>
    <UForm :validate="validate" :state="cate" class="flex flex-col space-y-4">
      <UFormField label="Category name" name="name">
        <UInput v-model="cate.name" class="w-full" />
      </UFormField>

      <UFormField label="Description" name="description">
        <UTextarea v-model="cate.description" :rows="8" class="w-full" />
      </UFormField>

      <UFormField label="Status" name="status">
        <USelect v-model="cate.status" :items="selectStatus" class="w-full" />
      </UFormField>
      <div class="flex gap-4">
        <UButton type="submit" class="w-full justify-center rounded-md lg:w-fit"> Create </UButton>
        <UButton type="submit" class="w-full justify-center rounded-md lg:w-fit"> Edit </UButton>
        <UButton
          color="neutral"
          class="w-full justify-center rounded-md lg:w-fit"
          @click="router.push('/admin/users')"
        >
          Cancel
        </UButton>
      </div>
    </UForm>
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
