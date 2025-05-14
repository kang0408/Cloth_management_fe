<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const thumbnail = reactive({ url: null, file: null });
const selectStatus = ref([
  {
    label: "Active",
    value: "active"
  },
  {
    label: "Inactive",
    value: "inactive"
  }
]);
const statusValue = ref("active");

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    thumbnail.file = file;
    thumbnail.url = URL.createObjectURL(file);
  } else {
    thumbnail.file = null;
    thumbnail.url = null;
  }
};
</script>

<template>
  <h1 class="text-primary-500 mb-4 text-xl font-bold">Create Product</h1>
  <UForm class="grid grid-cols-2 justify-between space-y-4">
    <div class="space-y-4">
      <UFormField label="Title" name="title">
        <UInput class="w-full" />
      </UFormField>

      <UFormField label="Description" name="description">
        <UTextarea v-model="description" :rows="8" class="w-full" />
      </UFormField>

      <div class="grid grid-cols-3 gap-4">
        <UFormField label="Status" name="status">
          <USelect v-model="statusValue" :items="selectStatus" class="w-full" />
        </UFormField>
        <UFormField label="Price" name="price">
          <UInput type="number" class="w-full" />
        </UFormField>
        <UFormField label="Stock" name="stock">
          <UInput type="number" class="w-full" />
        </UFormField>
      </div>
    </div>
    <div class="justify-self-center">
      <div class="mb-2 h-80 w-80 rounded-md border-1 border-dashed bg-white p-4">
        <img v-if="thumbnail.url" :src="thumbnail.url" class="h-full w-full object-contain" />
      </div>
      <UFormField label="Thumbnail" name="thumbnail">
        <UInput type="file" @change="onFileChange" />
      </UFormField>
    </div>
    <div class="flex gap-4">
      <UButton type="submit" class="w-full justify-center rounded-md lg:w-fit"> Create </UButton>
      <UButton
        color="neutral"
        class="w-full justify-center rounded-md lg:w-fit"
        @click="router.push('/admin/products')"
      >
        Cancel
      </UButton>
    </div>
  </UForm>
</template>
