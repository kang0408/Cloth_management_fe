<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/User/auth.store";

const authStore = useAuthStore();
const router = useRouter();
const state = reactive({
  username: "",
  email: "",
  password: "",
  rePassword: ""
});

const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
const passwordRegex = /^(?=.*[0-9])(?=.*[A-Za-z])\S{8,}$/;

const validate = (state) => {
  const errors = [];
  if (!state.username) errors.push({ name: "username", message: "Required" });
  if (state.username.length < 5)
    errors.push({ name: "username", message: "Username is too short" });
  if (state.username.length > 20)
    errors.push({ name: "username", message: "Username exceeds 20 characters" });

  if (!state.email) errors.push({ name: "email", message: "Required" });
  if (!gmailRegex.test(state.email)) errors.push({ name: "email", message: "Invalid email" });

  if (!state.password) errors.push({ name: "password", message: "Required" });
  if (!passwordRegex.test(state.password))
    errors.push({
      name: "password",
      message: "Password must be at least 8 characters long and contain both letters and numbers"
    });

  if (!state.rePassword) errors.push({ name: "rePassword", message: "Required" });
  if (!passwordRegex.test(state.rePassword))
    errors.push({
      name: "rePassword",
      message: "Password must be at least 8 characters long and contain both letters and numbers"
    });
  if (state.rePassword !== state.password)
    errors.push({ name: "rePassword", message: "Password is not match" });

  return errors;
};

const toast = useToast();
async function onSubmit() {
  try {
    const res = await authStore.register(state.username, state.email, state.password);
    if (res.success) toast.add({ title: "Success", description: res.message, color: "success" });
  } catch (error) {
    toast.add({ title: "Failure", description: error?.response?.data?.message, color: "error" });
  }
}
</script>
<template>
  <div
    class="login-wrap border-primary-200 w-full rounded-md border-1 bg-white p-6 shadow-xl sm:w-2/3 sm:p-8 md:w-1/2 lg:w-1/4"
  >
    <UButton
      color="neutral"
      variant="outline"
      icon="ion:arrow-back-outline"
      size="md"
      class="text-gray mb-6 rounded-full"
      @click="router.back()"
    />
    <p class="text-xl font-bold">Register</p>
    <p class="text-gray border-primary-200 mb-6 border-b-1 pb-4 text-xs">
      There's lots of fun in Register.
    </p>
    <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField label="User Name" name="username">
        <UInput v-model="state.username" class="w-full" />
      </UFormField>

      <UFormField label="Email" name="email">
        <UInput v-model="state.email" class="w-full" />
      </UFormField>

      <UFormField label="Password" name="password">
        <UInput v-model="state.password" type="password" class="w-full" />
      </UFormField>

      <UFormField label="Re-Password" name="rePassword">
        <UInput v-model="state.rePassword" type="password" class="w-full" />
      </UFormField>

      <UFormField name="check">
        <UCheckbox label="I agree to the Terms & Conditions" v-model="state.check" required />
      </UFormField>

      <UButton type="submit" class="w-full justify-center rounded-md lg:w-fit"> Register </UButton>

      <p class="text-gray text-xs">
        Have an account?
        <router-link to="/auth/login" class="hover:text-primary-500 font-medium text-black"
          >Login</router-link
        >
        now!
      </p>
    </UForm>
  </div>
</template>
