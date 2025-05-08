<script setup>
import { onMounted, ref, h, useTemplateRef } from "vue";
import { getPaginationRowModel } from "@tanstack/vue-table";

import { useCartStore } from "../../stores/User/cart.store";

const cartStore = useCartStore();
const table = useTemplateRef("table");
const productList = ref([]);
const totalPrice = ref(null);

const columns = [
  {
    accessorKey: "title",
    header: "Name",
    accessorFn: (row) => row.productId?.title ?? ""
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      }).format(amount);
      return h("div", { class: "font-medium" }, formatted);
    }
  },
  {
    accessorKey: "quantity",
    header: "Quantity"
  },
  {
    id: "sub-total",
    header: "Sub Total",
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("price") * row.getValue("quantity"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      }).format(amount);
      return h("div", { class: "font-medium" }, formatted);
    }
  },
  {
    id: "action"
  }
];
const pagination = ref({
  pageIndex: 0,
  pageSize: 5
});
const toggleModal = ref(false);
const modalTitle = ref("");
const cartAction = ref("");
const productId = ref("");
const toast = useToast();

const getCart = async () => {
  try {
    await cartStore.getCart();
    productList.value = cartStore.products;
    totalPrice.value = cartStore.totalPrice;
  } catch (error) {
    productList.value = [];
  }
};

const toggleModalHandler = (action, id = "") => {
  toggleModal.value = !toggleModal.value;
  if (action === "remove") {
    modalTitle.value = "Are you sure about removing this product?";
    productId.value = id;
  } else {
    modalTitle.value = "Are you sure about clear cart?";
  }
  cartAction.value = action;
};

const actionCartHandler = async () => {
  if (cartAction.value == "remove") {
    try {
      const res = await cartStore.removeCart(productId.value);
      if (res.success) {
        toast.add({ title: "Success", description: res.message, color: "success" });
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.add({ title: "Failure", description: error?.response?.data?.message, color: "error" });
    }
  } else {
    try {
      const res = await cartStore.clearCart();
      if (res.success) {
        toast.add({ title: "Success", description: res.message, color: "success" });
      }
    } catch (error) {
      toast.add({ title: "Failure", description: error?.response?.data?.message, color: "error" });
    }
  }
  toggleModal.value = false;
  await getCart();
};

onMounted(async () => {
  await getCart();
});
</script>
<template>
  <div
    class="flex flex-col gap-6 px-4 py-15 sm:gap-8 sm:px-5 sm:py-18 md:gap-10 md:px-15 md:py-24 lg:gap-12 lg:px-40 lg:py-26"
  >
    <div class="flex flex-row gap-2">
      <UButton class="w-fit rounded-md" @click="toggleModalHandler('clear')">Clear Cart</UButton>
      <UInput
        :model-value="table?.tableApi?.getColumn('title')?.getFilterValue()"
        :ui="{
          base: 'h-full'
        }"
        placeholder="Filter cloth title..."
        @update:model-value="table?.tableApi?.getColumn('title')?.setFilterValue($event)"
      />
    </div>
    <UTable
      ref="table"
      :data="productList"
      :columns="columns"
      v-model:pagination="pagination"
      :pagination-options="{
        getPaginationRowModel: getPaginationRowModel()
      }"
      class="flex-1"
    >
      <template #title-cell="{ row }">
        <div class="flex items-center gap-3">
          <div class="h-20 w-20">
            <img
              :src="row.original.productId ? row.original.productId.thumbnail : ''"
              class="h-full w-full object-cover"
            />
          </div>
          <p class="text-highlighted font-medium">
            {{ row.original.productId ? row.original.productId.title : "" }}
          </p>
        </div>
      </template>
      <template #action-cell="{ row }">
        <UButton
          icon="ix:error"
          color="neutral"
          variant="ghost"
          aria-label="Actions"
          @click="toggleModalHandler('remove', row.original.productId._id)"
        />
      </template>
    </UTable>
    <div class="flex justify-center pt-4 sm:justify-end">
      <UPagination
        :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
        :items-per-page="table?.tableApi?.getState().pagination.pageSize"
        :total="table?.tableApi?.getFilteredRowModel().rows.length"
        @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
        color="neutral"
        variant="subtle"
        :ui="{ item: 'rounded-md' }"
      />
    </div>

    <div class="flex justify-center sm:justify-end">
      <table class="table-auto">
        <tbody>
          <tr>
            <td class="py-4 pr-6 font-bold">CART SUBTOTAL</td>
            <td class="py-4 font-medium">$ {{ totalPrice }}</td>
          </tr>
          <tr class="border-gray border-b-1">
            <td class="py-4 pr-6 font-bold">Shipping and Handling</td>
            <td class="py-4 font-medium">FREE</td>
          </tr>
          <tr>
            <td class="py-4 pr-6 font-bold">ORDER TOTAL</td>
            <td class="text-primary py-4 font-medium">$ {{ totalPrice }}</td>
          </tr>
          <tr>
            <td colspan="2" class="pt-4">
              <div class="flex sm:justify-end">
                <UButton class="rounded-md">Proceed to Checkout</UButton>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <UModal
      :title="modalTitle"
      v-model:open="toggleModal"
      class="w-3/4 sm:w-1/2 lg:w-1/4"
      :ui="{
        header: 'w-4/5'
      }"
    >
      <template #body>
        <div class="flex gap-4">
          <UButton
            color="neutral"
            label="Do it!"
            variant="solid"
            class="w-full rounded-xs"
            @click="actionCartHandler"
          />
          <UButton label="Hmmm..." class="w-full rounded-xs" @click="toggleModal = !toggleModal" />
        </div>
      </template>
    </UModal>
  </div>
</template>
