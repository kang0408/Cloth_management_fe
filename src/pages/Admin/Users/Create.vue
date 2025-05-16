<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useAdminUsersStore } from "../../../stores/Admin/users.store";

const userStore = useAdminUsersStore();
const router = useRouter();
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
  role: "user"
});

const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
const validate = (user) => {
  const errors = [];
  if (!user.username) errors.push({ name: "username", message: "Required" });
  if (user.username.length < 5) errors.push({ name: "username", message: "Username is too short" });
  if (user.username.length > 20)
    errors.push({ name: "username", message: "Username exceeds 20 characters" });
  if (!user.email) errors.push({ name: "email", message: "Required" });
  if (!gmailRegex.test(user.email)) errors.push({ name: "email", message: "Invalid email" });
  return errors;
};

const toast = useToast();
async function onSubmit() {
  try {
    const res = await userStore.createUser(user);
    if (res.success) {
      toast.add({ title: "Success", description: res.message, color: "success" });
      router.push("/admin/users");
    }
  } catch (error) {
    toast.add({ title: "Failure", description: error?.response?.data?.message, color: "error" });
  }
}
</script>

<template>
  <h1 class="text-primary-500 mb-4 text-xl font-bold">Create User</h1>
  <UForm :validate="validate" :state="user" @submit="onSubmit" class="space-y-4">
    <UFormField label="Username" name="username" required>
      <UInput v-model="user.username" class="w-full" />
    </UFormField>

    <UFormField label="Email" name="email" required>
      <UInput v-model="user.email" class="w-full" />
    </UFormField>

    <UFormField label="Role" name="role">
      <USelect v-model="user.role" :items="selectRole" class="w-full" />
    </UFormField>
    <div class="flex gap-4">
      <UButton type="submit" class="w-full justify-center rounded-md lg:w-fit"> Create </UButton>
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
