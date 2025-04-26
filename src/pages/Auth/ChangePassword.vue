<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const state = reactive({
  oldPassword: undefined,
  newPassword: undefined,
  rePassword: undefined,
  otp: undefined
});
const step = ref(0);

const validate = (state) => {
  const errors = [];
  //   if (!state.email) errors.push({ name: "email", message: "Required" });
  //   if (!state.otp) errors.push({ name: "otp", message: "Required" });
  //   if (!state.newPassword) errors.push({ name: "newPassword", message: "Required" });
  return errors;
};

const submitHandler = () => {
  step.value += 1;
  if (step.value == 2) {
    router.push("/");
  }
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

    <p class="text-xl font-bold">Change password</p>
    <p class="text-gray border-primary-200 mb-6 border-b-1 pb-4 text-xs">
      OMG! Does anyone know your password?
    </p>
    <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
      <div class="flex flex-col gap-4" v-if="step == 0">
        <UFormField label="Old password" name="oldPassword">
          <UInput v-model="state.oldPassword" class="w-full" />
        </UFormField>
        <UFormField label="New password" name="newPassword">
          <UInput v-model="state.newPassword" class="w-full" />
        </UFormField>
        <UFormField label="Re-new password" name="rePassword">
          <UInput v-model="state.rePassword" class="w-full" />
        </UFormField>
      </div>
      <div class="flex flex-col gap-4" v-if="step == 1">
        <p class="text-xs">Enter your OTP</p>
        <UFormField name="otp">
          <UPinInput
            v-model="state.otp"
            class="w-full justify-between"
            :ui="{ base: 'w-1/6 h-12' }"
          />
        </UFormField>
      </div>
      <UButton
        type="submit"
        class="w-full justify-center rounded-md lg:w-fit"
        @click="submitHandler"
      >
        Submit
      </UButton>
    </UForm>
  </div>
</template>
