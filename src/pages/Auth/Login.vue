<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const state = reactive({
  email: undefined,
  password: undefined
});

const validate = (state) => {
  const errors = [];
  if (!state.email) errors.push({ name: "email", message: "Required" });
  if (!state.password) errors.push({ name: "password", message: "Required" });
  return errors;
};

const toast = useToast();
async function onSubmit(event) {
  toast.add({ title: "Success", description: "The form has been submitted.", color: "success" });
  console.log(event.data);
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

    <p class="text-xl font-bold">Login</p>
    <p class="text-gray border-primary-200 mb-6 border-b-1 pb-4 text-xs">
      Everything is simple with Login.
    </p>
    <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField label="Email" name="email">
        <UInput v-model="state.email" class="w-full" />
      </UFormField>

      <UFormField label="Password" name="password">
        <UInput v-model="state.password" type="password" class="w-full" />
      </UFormField>
      <div
        class="login-option flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center sm:gap-0"
      >
        <UCheckbox label="Keep me signed in" />
        <router-link to="/auth/forgot-password" class="hover:text-primary-500 text-gray text-xs"
          >Forgot password?</router-link
        >
      </div>

      <UButton type="submit" class="w-full justify-center rounded-md lg:w-fit"> Login </UButton>

      <p class="text-gray text-xs">
        Don't have an account?
        <router-link to="/auth/register" class="hover:text-primary-500 font-medium text-black"
          >Register</router-link
        >
        now!
      </p>
    </UForm>
  </div>
</template>
