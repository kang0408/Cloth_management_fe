<script setup>
import { onMounted, reactive, ref } from "vue";
import { useUserStore } from "../../stores/User/user.store";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { profile } = storeToRefs(userStore);
const state = reactive({
  username: "",
  email: "",
  avatar: {
    url: null,
    file: null
  }
});
const defaultAvt = "/home/cates/category-09.jpg";

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    state.avatar.file = file;
    state.avatar.url = URL.createObjectURL(file);
  } else {
    state.avatar.file = null;
    state.avatar.url = null;
  }
};

const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
const validate = (state) => {
  const errors = [];
  if (!state.username) errors.push({ name: "username", message: "Required" });
  if (state.username.length < 5)
    errors.push({ name: "username", message: "Username is too short" });
  if (state.username.length > 20)
    errors.push({ name: "username", message: "Username exceeds 20 characters" });
  if (!state.email) errors.push({ name: "email", message: "Required" });
  if (!gmailRegex.test(state.email)) errors.push({ name: "email", message: "Invalid email" });
  return errors;
};

const loading = ref(false);
const toast = useToast();
async function onSubmit() {
  const formData = new FormData();
  formData.append("username", state.username);
  formData.append("email", state.email);
  formData.append("avatar", state.avatar.file);
  loading.value = true;
  try {
    const res = await userStore.updateProfile(formData);
    if (res.success) toast.add({ title: "Success", description: res.message, color: "success" });
  } catch (error) {
    toast.add({ title: "Failure", description: error?.response?.data?.message, color: "error" });
  }
  loading.value = false;
}

onMounted(() => {
  state.username = profile.value.username;
  state.email = profile.value.email;
  state.avatar.url = profile.value.avatar;
  state.avatar.file = profile.value.avatar;
});
</script>
<template>
  <div>
    <p class="text-xl font-bold">My Profile</p>
    <p class="text-gray border-gray mb-6 border-b-1 pb-4 text-xs">It's profile time!</p>
    <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
      <div class="flex flex-col items-center">
        <div class="mb-2 h-60 w-60 rounded-full border-1 border-dashed bg-white p-1">
          <img
            :src="state.avatar.url ? state.avatar.url : defaultAvt"
            class="h-full w-full rounded-full object-cover"
          />
        </div>
        <UFormField label="Thumbnail" name="avatar">
          <UInput :disabled="action" type="file" @change="onFileChange" />
        </UFormField>
      </div>

      <UFormField label="Username" name="username">
        <UInput v-model="state.username" class="w-full" />
      </UFormField>

      <UFormField label="Email" name="email">
        <UInput v-model="state.email" type="email" class="w-full" />
      </UFormField>

      <UButton type="submit" class="w-full justify-center rounded-md lg:w-fit" :loading="loading">
        Update profile
      </UButton>
    </UForm>
  </div>
</template>
