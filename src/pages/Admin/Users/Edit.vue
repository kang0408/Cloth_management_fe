<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAdminUsersStore } from "../../../stores/Admin/users.store";

const adminUserStore = useAdminUsersStore();
const router = useRouter();
const route = useRoute();
const selectRole = ref([
  {
    label: "Admin",
    value: "admin"
  },
  {
    label: "User",
    value: "user"
  }
]);
const user = reactive({
  username: "",
  email: "",
  role: "user",
  avatar: {
    url: null,
    file: null
  }
});
const action = ref(true);
const toast = useToast();
const defaultAvt = "/home/cates/category-09.jpg";

const changeAction = () => {
  action.value = !action.value;
  if (action.value) {
    toast.add({ title: "Detail User", color: "info" });
  } else toast.add({ title: "Edit User", color: "info" });
};

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    user.avatar.file = file;
    user.avatar.url = URL.createObjectURL(file);
  } else {
    user.avatar.file = null;
    user.avatar.url = null;
  }
};

const getDetail = async () => {
  try {
    const res = await adminUserStore.getDetail(route.params.id);
    if (res.success) {
      const { username, email, role, avatar } = res.data;
      user.username = username;
      user.email = email;
      user.role = role;
      user.avatar.url = avatar;
      user.avatar.file = avatar;
    }
  } catch (error) {
    toast.add({ title: "Failure", description: error?.response?.data?.message, color: "error" });
  }
};

const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
const validate = (user) => {
  const errors = [];
  if (user.username.length < 5) errors.push({ name: "username", message: "Username is too short" });
  if (user.username.length > 20)
    errors.push({ name: "username", message: "Username exceeds 20 characters" });
  if (!gmailRegex.test(user.email)) errors.push({ name: "email", message: "Invalid email" });
  return errors;
};

async function onSubmit() {
  const formData = new FormData();
  formData.append("username", user.username);
  formData.append("email", user.email);
  formData.append("role", user.role);
  formData.append("avatar", user.avatar.file);

  try {
    const res = await adminUserStore.editUser(route.params.id, formData);
    if (res.success) {
      toast.add({ title: "Success", description: res.message, color: "success" });
    }
  } catch (error) {
    toast.add({ title: "Failure", description: error?.response?.data?.message, color: "error" });
  }
}

onMounted(async () => {
  await getDetail();
});
</script>

<template>
  <div class="mb-4 flex items-center gap-2">
    <h1 v-if="action" class="text-primary-500 text-xl font-bold">Detail User</h1>
    <h1 v-else class="text-primary-500 text-xl font-bold">Edit User</h1>
    <UButton
      icon="solar:pen-bold"
      color="neutral"
      variant="ghost"
      aria-label="Actions"
      @click="changeAction"
    />
  </div>
  <UForm
    :validate="validate"
    :state="user"
    @submit="onSubmit"
    class="grid grid-cols-2 justify-between space-y-4"
  >
    <div class="space-y-4">
      <UFormField label="Username" name="username">
        <UInput :disabled="action" v-model="user.username" class="w-full" />
      </UFormField>

      <UFormField label="Email" name="email">
        <UInput :disabled="action" v-model="user.email" class="w-full" />
      </UFormField>

      <UFormField label="Role" name="role">
        <USelect :disabled="action" v-model="user.role" :items="selectRole" class="w-full" />
      </UFormField>
    </div>
    <div class="justify-self-center">
      <div class="mb-2 h-80 w-80 rounded-md border-1 border-dashed bg-white p-4">
        <img
          :src="user.avatar.url ? user.avatar.url : defaultAvt"
          class="h-full w-full object-contain"
        />
      </div>
      <UFormField label="Thumbnail" name="avatar">
        <UInput :disabled="action" type="file" @change="onFileChange" />
      </UFormField>
    </div>
    <div class="flex gap-4">
      <UButton type="submit" class="w-full justify-center rounded-md lg:w-fit" v-if="!action">
        Edit
      </UButton>
      <UButton
        color="neutral"
        class="w-full justify-center rounded-md lg:w-fit"
        @click="router.push('/admin/users')"
      >
        Cancel
      </UButton>
    </div>
  </UForm>
</template>
