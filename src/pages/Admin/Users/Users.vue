<script setup>
import { ref, onMounted, watch, h, resolveComponent } from "vue";
import { useRouter } from "vue-router";
import { useAdminUsersStore } from "../../../stores/Admin/users.store";

const UBadge = resolveComponent("UBadge");

const adminUserStore = useAdminUsersStore();
const router = useRouter();

const sortByItems = ref([
  {
    label: "Username",
    id: "username"
  },
  {
    label: "Email",
    id: "email"
  },
  {
    label: "Updated Time",
    id: "updatedAt"
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
    accessorKey: "username",
    header: "Username"
  },
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const color = {
        user: "info",
        admin: "warning"
      }[row.getValue("role")];

      return h(UBadge, { class: "capitalize", variant: "subtle", color }, () =>
        row.getValue("role")
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
const totalUsers = ref(1);
const sortBy = ref("updatedAt");
const sortValue = ref("desc");
const searchString = ref("");
const loading = ref(true);
const defaultAvt = "/home/cates/category-09.jpg";

const usersList = ref([]);
const toast = useToast();

const toggleModal = ref(false);
const deletedUserId = ref("");

const toggleModalHandler = (id) => {
  toggleModal.value = !toggleModal.value;
  deletedUserId.value = id;
};

const loadUsers = async () => {
  loading.value = true;
  try {
    const res = await adminUserStore.getUsers({
      limit: itemsPerPageValue.value,
      page: currentPage.value,
      sortBy: sortBy.value,
      sortValue: sortValue.value,
      search: searchString.value
    });
    if (res.success) {
      usersList.value = res.data.users;
      totalPages.value = adminUserStore.totalPages;
      currentPage.value = adminUserStore.currentPage;
      totalUsers.value = adminUserStore.totalUsers;

      loading.value = false;

      toast.add({ title: "Success", description: res.message, color: "success" });
    }
  } catch (error) {
    toast.add({ title: "Failure", description: error?.response?.data?.message, color: "error" });
    loading.value = false;
  }
};

const deleteUserHandler = async () => {
  try {
    const res = await adminUserStore.deleteUser(deletedUserId.value);
    if (res.success) {
      toast.add({ title: "Success", description: res.message, color: "success" });
    }
  } catch (error) {
    toast.add({ title: "Failure", description: error?.response?.data?.message, color: "error" });
  }
  toggleModal.value = !toggleModal.value;
  await loadUsers();
};

onMounted(async () => {
  await loadUsers();
});

watch([itemsPerPageValue, currentPage, sortBy, sortValue], loadUsers);

watch(searchString, (newVal) => {
  if (newVal === "") {
    loadUsers();
  }
});
</script>

<template>
  <div class="mb-4 flex">
    <UInput
      icon="i-lucide-search"
      size="md"
      variant="outline"
      placeholder="Search user here..."
      class="w-full"
      :ui="{
        base: 'rounded-l-xl rounded-r-none border-2 border-white outline-none focus:border-primary-500 ring-0 focus:inset-shadow-none focus-visible:ring-0'
      }"
      v-model="searchString"
      @keydown.enter="loadUsers"
    />
    <UButton class="rounded-r-xl" @click="loadUsers">Search</UButton>
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
    <UButton class="rounded-xl" icon="ic:baseline-plus" @click="router.push('users/create')"
      >Create</UButton
    >
  </div>
  <UTable
    :loading="loading"
    loading-color="primary"
    loading-animation="carousel"
    :data="usersList"
    :columns="columns"
    class="rounded-xl bg-white"
  >
    <template #username-cell="{ row }">
      <div class="flex items-center gap-3">
        <div class="h-20 w-20">
          <img
            :src="row.original.avatar ? row.original.avatar : defaultAvt"
            class="h-full w-full rounded-full object-cover"
          />
        </div>
        <p class="text-highlighted font-medium">
          {{ row.original ? row.original.username : "" }}
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
          @click="router.push(`users/edit/${row.original._id}`)"
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
      :total="totalUsers"
      :ui="{
        item: 'rounded-md'
      }"
      @change="loadUsers"
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
          @click="deleteUserHandler()"
        />
        <UButton label="Hmmm..." class="w-full rounded-xs" @click="toggleModal = !toggleModal" />
      </div>
    </template>
  </UModal>
</template>
