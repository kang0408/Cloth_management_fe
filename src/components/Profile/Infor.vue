<script setup>
import { reactive } from "vue";

const state = reactive({
  username: "Kangtran4804",
  email: "kangtran4804@gmail.com"
});

const validate = (state) => {
  const errors = [];
  //   if (!state.username) errors.push({ name: "username", message: "Required" });
  //   if (!state.email) errors.push({ name: "email", message: "Required" });
  return errors;
};

const toast = useToast();
async function onSubmit(event) {
  toast.add({ title: "Success", description: "The form has been submitted.", color: "success" });
  console.log(event.data);
}
</script>
<template>
  <div>
    <p class="text-xl font-bold">My Profile</p>
    <p class="text-gray border-gray mb-6 border-b-1 pb-4 text-xs">It's profile time!</p>
    <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField label="Username" name="username">
        <UInput v-model="state.username" class="w-full" />
      </UFormField>

      <UFormField label="Email" name="email">
        <UInput v-model="state.email" type="email" class="w-full" />
      </UFormField>

      <UButton type="submit" class="w-full justify-center rounded-md lg:w-fit">
        Update profile
      </UButton>
    </UForm>
  </div>
</template>
