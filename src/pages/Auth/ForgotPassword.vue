<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useOtpStore } from "../../stores/User/otp.store";
import { useAuthStore } from "../../stores/User/auth.store";

const otpStore = useOtpStore();
const authStore = useAuthStore();
const router = useRouter();
const state = reactive({
  email: undefined,
  otp: undefined,
  newPassword: undefined
});
const step = ref(0);
const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
const passwordRegex = /^(?=.*[0-9])(?=.*[A-Za-z])\S{8,}$/;

const validate = (state) => {
  const errors = [];
  if (step.value == 0) {
    if (!state.email) errors.push({ name: "email", message: "Required" });
    if (!gmailRegex.test(state.email)) errors.push({ name: "email", message: "Invalid email" });
  } else if (step.value == 1) {
    if (!state.otp || state.otp.length < 6) errors.push({ name: "otp", message: "Required" });
  } else {
    if (!state.newPassword) errors.push({ name: "newPassword", message: "Required" });
    if (!passwordRegex.test(state.newPassword))
      errors.push({
        name: "newPassword",
        message: "Password must be at least 8 characters long and contain both letters and numbers"
      });
  }

  return errors;
};

const toast = useToast();
async function onSubmit() {
  if (step.value == 0) {
    try {
      toast.add({ title: "Success", description: "OTP is sending to email", color: "success" });
      const res = await otpStore.sendOtp(state.email);

      if (res.success) {
        toast.add({ title: "Success", description: res.message, color: "success" });
        step.value += 1;
      }
    } catch (error) {
      toast.add({ title: "Failure", description: error?.response?.data?.message, color: "error" });
    }
  } else if (step.value == 1) {
    try {
      toast.add({ title: "Success", description: "OTP is verifying...", color: "success" });
      const res = await otpStore.verifyOtp(state.email, state.otp.join(""));

      if (res.success) {
        toast.add({ title: "Success", description: res.message, color: "success" });
        step.value += 1;
      }
    } catch (error) {
      toast.add({ title: "Failure", description: error?.response?.data?.message, color: "error" });
    }
  } else if (step.value == 2) {
    try {
      toast.add({ title: "Success", description: "Password is resetting...", color: "success" });
      const res = await authStore.resetPassword(state.newPassword, otpStore.verifyToken);

      if (res.success) {
        toast.add({ title: "Success", description: res.message, color: "success" });
        router.push("/auth/login");
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

    <p class="text-xl font-bold">Forgot password</p>
    <p class="text-gray border-primary-200 mb-6 border-b-1 pb-4 text-xs">
      Come here if you forgot password!
    </p>
    <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField label="Enter your email" name="email" v-if="step == 0">
        <UInput v-model="state.email" class="w-full" />
      </UFormField>
      <div class="flex flex-col gap-4" v-if="step == 1">
        <p class="text-xs">Enter your OTP</p>
        <UFormField name="otp">
          <UPinInput
            v-model="state.otp"
            class="w-full justify-between"
            :ui="{ base: 'w-1/6 h-12' }"
            :length="6"
          />
        </UFormField>
      </div>
      <UFormField label="Enter your new password" name="newPassword" v-if="step == 2">
        <UInput v-model="state.newPassword" class="w-full" type="password" />
      </UFormField>

      <UButton type="submit" class="w-full justify-center rounded-md lg:w-fit"> Submit </UButton>
    </UForm>
  </div>
</template>
