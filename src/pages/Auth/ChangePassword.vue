<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useOtpStore } from "../../stores/User/otp.store";
import { useUserStore } from "../../stores/User/user.store";
import { useAuthStore } from "../../stores/User/auth.store";

const otpStore = useOtpStore();
const userStore = useUserStore();
const authStore = useAuthStore();
const router = useRouter();
const state = reactive({
  oldPassword: undefined,
  newPassword: undefined,
  rePassword: undefined
});
const otp = ref(undefined);
const step = ref(0);

const passwordRegex = /^(?=.*[0-9])(?=.*[A-Za-z])\S{8,}$/;
const validate = (state) => {
  const errors = [];
  if (!state.oldPassword) errors.push({ name: "oldPassword", message: "Required" });
  if (!passwordRegex.test(state.oldPassword))
    errors.push({
      name: "oldPassword",
      message: "Password must be at least 8 characters long and contain both letters and numbers"
    });
  if (!state.newPassword) errors.push({ name: "newPassword", message: "Required" });
  if (!passwordRegex.test(state.newPassword))
    errors.push({
      name: "newPassword",
      message: "Password must be at least 8 characters long and contain both letters and numbers"
    });
  if (!state.rePassword) errors.push({ name: "rePassword", message: "Required" });
  if (!passwordRegex.test(state.rePassword))
    errors.push({
      name: "rePassword",
      message: "Password must be at least 8 characters long and contain both letters and numbers"
    });
  if (state.rePassword !== state.newPassword)
    errors.push({ name: "rePassword", message: "Password is not match" });
  return errors;
};

const toast = useToast();
async function onSubmit() {
  if (step.value == 0) {
    await userStore.getProfile();
    try {
      const res = await otpStore.sendOtp(userStore.profile.email);

      if (res.success) {
        toast.add({ title: "Success", description: res.message, color: "success" });
        step.value += 1;
      }
    } catch (error) {
      toast.add({ title: "Failure", description: error?.response?.data?.message, color: "error" });
    }
  } else if (step.value === 1) {
    try {
      const res = await otpStore.verifyOtp(userStore.profile.email, otp.value.join(""));

      if (res.success) {
        toast.add({ title: "Success", description: res.message, color: "success" });

        try {
          const res = await authStore.changePassword(
            state.oldPassword,
            state.newPassword,
            otpStore.verifyToken
          );

          if (res.success) {
            toast.add({ title: "Success", description: res.message, color: "success" });
            authStore.logout();
            router.push("/");
          }
        } catch (error) {
          toast.add({
            title: "Failure",
            description: error?.response?.data?.message,
            color: "error"
          });
        }
      }
    } catch (error) {
      toast.add({ title: "Failure", description: error?.response?.data?.message, color: "error" });
    }
  } else {
    return;
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

    <p class="text-xl font-bold">Change password</p>
    <p class="text-gray border-primary-200 mb-6 border-b-1 pb-4 text-xs">
      OMG! Does anyone know your password?
    </p>
    <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
      <div class="flex flex-col gap-4" v-if="step == 0">
        <UFormField label="Old password" name="oldPassword">
          <UInput v-model="state.oldPassword" class="w-full" type="password" />
        </UFormField>
        <UFormField label="New password" name="newPassword">
          <UInput v-model="state.newPassword" class="w-full" type="password" />
        </UFormField>
        <UFormField label="Re-new password" name="rePassword">
          <UInput v-model="state.rePassword" class="w-full" type="password" />
        </UFormField>
      </div>
      <div class="flex flex-col gap-4" v-if="step == 1">
        <p class="text-xs">Enter your OTP</p>
        <UFormField name="otp">
          <UPinInput
            v-model="otp"
            class="w-full justify-between"
            :ui="{ base: 'w-1/6 h-12' }"
            :length="6"
          />
        </UFormField>
      </div>
      <UButton type="submit" class="w-full justify-center rounded-md lg:w-fit"> Submit </UButton>
    </UForm>
  </div>
</template>
