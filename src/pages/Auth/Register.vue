<script setup>
import { reactive, ref } from "vue";

const state = reactive({
  userName: undefined,
  email: undefined,
  password: undefined,
  rePassword: undefined
});

const validate = (state) => {
  const errors = [];
  if (!state.userName) errors.push({ name: "userName", message: "Required" });
  if (!state.email) errors.push({ name: "email", message: "Required" });
  if (!state.password) errors.push({ name: "password", message: "Required" });
  if (!state.rePassword) errors.push({ name: "rePassword", message: "Required" });
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
    <p class="text-xl font-bold">Register</p>
    <p class="text-gray border-primary-200 mb-6 border-b-1 pb-4 text-xs">
      There's lots of fun in Register.
    </p>
    <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField label="User Name" name="userName">
        <UInput v-model="state.userName" class="w-full" />
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

      <UButton type="submit" class="rounded-md"> Register </UButton>

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
