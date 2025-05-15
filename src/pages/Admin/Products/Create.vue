<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useAdminClothesStore } from "../../../stores/Admin/clothes.store";

const clothesStore = useAdminClothesStore();
const router = useRouter();
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

const cloth = reactive({
  title: "",
  description: "",
  status: "active",
  price: 0,
  stock: 0,
  thumbnail: {
    url: null,
    file: null
  }
});

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    cloth.thumbnail.file = file;
    cloth.thumbnail.url = URL.createObjectURL(file);
  } else {
    cloth.thumbnail.file = null;
    cloth.thumbnail.url = null;
  }
};

const validate = (cloth) => {
  const errors = [];
  if (!cloth.title) errors.push({ name: "title", message: "Required" });
  if (!cloth.description) errors.push({ name: "description", message: "Required" });
  if (!cloth.thumbnail.file) errors.push({ name: "thumbnail", message: "Required" });
  return errors;
};

const toast = useToast();
async function onSubmit() {
  const formData = new FormData();
  formData.append("title", cloth.title);
  formData.append("description", cloth.description);
  formData.append("status", cloth.status);
  formData.append("price", cloth.price);
  formData.append("stock", cloth.stock);
  formData.append("thumbnail", cloth.thumbnail.file);

  try {
    const res = await clothesStore.createCloth(formData);
    console.log(res);
    if (res.success) {
      toast.add({ title: "Success", description: res.message, color: "success" });
      router.push("/admin/products");
    }
  } catch (error) {
    toast.add({ title: "Failure", description: error?.response?.data?.message, color: "error" });
  }
}
</script>

<template>
  <h1 class="text-primary-500 mb-4 text-xl font-bold">Create Product</h1>
  <UForm
    :validate="validate"
    :state="cloth"
    @submit="onSubmit"
    class="grid grid-cols-2 justify-between space-y-4"
  >
    <div class="space-y-4">
      <UFormField label="Title" name="title" required>
        <UInput v-model="cloth.title" class="w-full" />
      </UFormField>

      <UFormField label="Description" name="description" required>
        <UTextarea v-model="cloth.description" :rows="8" class="w-full" />
      </UFormField>

      <div class="grid grid-cols-3 gap-4">
        <UFormField label="Status" name="status">
          <USelect v-model="cloth.status" :items="selectStatus" class="w-full" />
        </UFormField>
        <UFormField label="Price" name="price">
          <UInput v-model="cloth.price" type="number" class="w-full" />
        </UFormField>
        <UFormField label="Stock" name="stock">
          <UInput v-model="cloth.stock" type="number" class="w-full" />
        </UFormField>
      </div>
    </div>
    <div class="justify-self-center">
      <div class="mb-2 h-80 w-80 rounded-md border-1 border-dashed bg-white p-4">
        <img
          v-if="cloth.thumbnail.url"
          :src="cloth.thumbnail.url"
          class="h-full w-full object-contain"
        />
      </div>
      <UFormField label="Thumbnail" name="thumbnail" required>
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
