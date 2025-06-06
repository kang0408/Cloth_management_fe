<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAdminClothesStore } from "../../../stores/Admin/clothes.store";

const adminClothesStore = useAdminClothesStore();
const router = useRouter();
const route = useRoute();
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
const action = ref(true);
const toast = useToast();

const changeAction = () => {
  action.value = !action.value;
  if (action.value) {
    toast.add({ title: "Detail Product", color: "info" });
  } else toast.add({ title: "Edit Product", color: "info" });
};

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

const getDetail = async () => {
  try {
    const res = await adminClothesStore.getDetailCloth(route.params.id);
    console.log(res);
    if (res.success) {
      const { title, description, status, price, stock, thumbnail } = res.data;
      cloth.title = title;
      cloth.description = description;
      cloth.status = status;
      cloth.price = price;
      cloth.stock = stock;
      cloth.thumbnail.url = thumbnail;
      cloth.thumbnail.file = thumbnail;
    }
  } catch (error) {
    toast.add({ title: "Failure", description: error?.response?.data?.message, color: "error" });
  }
};

const validate = (cloth) => {
  const errors = [];
  if (!cloth.title) errors.push({ name: "title", message: "Required" });
  if (!cloth.description) errors.push({ name: "description", message: "Required" });
  if (!cloth.thumbnail.file) errors.push({ name: "thumbnail", message: "Required" });
  return errors;
};

async function onSubmit() {
  const formData = new FormData();
  formData.append("title", cloth.title);
  formData.append("description", cloth.description);
  formData.append("status", cloth.status);
  formData.append("price", cloth.price);
  formData.append("stock", cloth.stock);
  formData.append("thumbnail", cloth.thumbnail.file);

  try {
    const res = await adminClothesStore.editCloth(route.params.id, formData);
    if (res.success) {
      toast.add({ title: "Success", description: res.message, color: "success" });
    }
  } catch (error) {
    toast.add({ title: "Failure", description: error?.response?.data?.message, color: "error" });
  }
}

onMounted(async () => {
  await getDetail();
});
</script>

<template>
  <div class="mb-4 flex items-center gap-2">
    <h1 v-if="action" class="text-primary-500 text-xl font-bold">Detail Product</h1>
    <h1 v-else class="text-primary-500 text-xl font-bold">Edit Product</h1>
    <UButton
      icon="solar:pen-bold"
      color="neutral"
      variant="ghost"
      aria-label="Actions"
      @click="changeAction"
    />
  </div>
  <UForm
    :validate="validate"
    :state="cloth"
    @submit="onSubmit"
    class="grid grid-cols-2 justify-between space-y-4"
  >
    <div class="space-y-4">
      <UFormField label="Title" name="title">
        <UInput :disabled="action" v-model="cloth.title" class="w-full" />
      </UFormField>

      <UFormField label="Description" name="description">
        <UTextarea :disabled="action" v-model="cloth.description" :rows="8" class="w-full" />
      </UFormField>

      <div class="grid grid-cols-3 gap-4">
        <UFormField label="Status" name="status">
          <USelect :disabled="action" v-model="cloth.status" :items="selectStatus" class="w-full" />
        </UFormField>
        <UFormField label="Price" name="price">
          <UInput :disabled="action" v-model="cloth.price" type="number" class="w-full" />
        </UFormField>
        <UFormField label="Stock" name="stock">
          <UInput :disabled="action" v-model="cloth.stock" type="number" class="w-full" />
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
      <UFormField label="Thumbnail" name="thumbnail">
        <UInput :disabled="action" type="file" @change="onFileChange" />
      </UFormField>
    </div>
    <div class="flex gap-4">
      <UButton type="submit" class="w-full justify-center rounded-md lg:w-fit" v-if="!action">
        Edit
      </UButton>
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
