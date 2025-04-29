<script setup>
import { ref, h, useTemplateRef } from "vue";
import { getPaginationRowModel } from "@tanstack/vue-table";

const table = useTemplateRef("table");

const productList = ref([
  {
    name: "Smart Digital Watch",
    price: 90.0,
    img: "/home/featured/product-01.jpg",
    quantity: 10
  },
  {
    name: "Desktop Speakers",
    price: 29.0,
    img: "/home/featured/product-02.jpg",
    quantity: 10
  },
  {
    name: "Wireless Controller",
    price: 55.0,
    img: "/home/featured/product-03.jpg",
    quantity: 10
  },
  {
    name: "Wireless Headset",
    price: 28.0,
    img: "/home/featured/product-04.jpg",
    quantity: 10
  },
  {
    name: "Gear 360 Video Editor",
    price: 88.0,
    img: "/home/featured/product-06.jpg",
    quantity: 10
  },
  {
    name: "USB Flash Drive",
    price: 15.0,
    img: "/home/featured/product-08.jpg",
    quantity: 10
  },
  {
    name: "Mini Bluetooth Speaker",
    price: 29.0,
    img: "/home/featured/product-09.jpg",
    quantity: 10
  },
  {
    name: "Smart Digital Watch",
    price: 90.0,
    img: "/home/featured/product-01.jpg",
    quantity: 10
  },
  {
    name: "Desktop Speakers",
    price: 29.0,
    img: "/home/featured/product-02.jpg",
    quantity: 10
  },
  {
    name: "Wireless Controller",
    price: 55.0,
    img: "/home/featured/product-03.jpg",
    quantity: 10
  },
  {
    name: "Wireless Headset",
    price: 28.0,
    img: "/home/featured/product-04.jpg",
    quantity: 10
  },
  {
    name: "Gear 360 Video Editor",
    price: 88.0,
    img: "/home/featured/product-06.jpg",
    quantity: 10
  },
  {
    name: "USB Flash Drive",
    price: 15.0,
    img: "/home/featured/product-08.jpg",
    quantity: 10
  },
  {
    name: "Mini Bluetooth Speaker",
    price: 29.0,
    img: "/home/featured/product-09.jpg",
    quantity: 10
  }
]);

const columns = [
  {
    accessorKey: "name",
    header: "Name"
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
</script>
<template>
  <div
    class="flex flex-col gap-6 px-4 py-15 sm:gap-8 sm:px-5 sm:py-18 md:gap-10 md:px-15 md:py-24 lg:gap-12 lg:px-40 lg:py-26"
  >
    <div class="flex flex-row gap-2">
      <UButton class="w-fit rounded-md">Clear Cart</UButton>
      <UInput
        :model-value="table?.tableApi?.getColumn('name')?.getFilterValue()"
        :ui="{
          base: 'h-full'
        }"
        placeholder="Filter cloth name..."
        @update:model-value="table?.tableApi?.getColumn('name')?.setFilterValue($event)"
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
      <template #name-cell="{ row }">
        <div class="flex items-center gap-3">
          <div class="h-20 w-20">
            <img :src="row.original.img" class="h-full w-full object-cover" />
          </div>
          <p class="text-highlighted font-medium">{{ row.original.name }}</p>
        </div>
      </template>
      <template #action-cell="{ row }">
        <UButton icon="ix:error" color="neutral" variant="ghost" aria-label="Actions" />
      </template>
    </UTable>

    <div class="flex justify-center pt-4 sm:justify-end">
      <UPagination
        :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
        :items-per-page="table?.tableApi?.getState().pagination.pageSize"
        :total="table?.tableApi?.getFilteredRowModel().rows.length"
        @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
        :ui="{
          item: 'rounded-md'
        }"
      />
    </div>

    <div class="flex justify-center sm:justify-end">
      <table class="table-auto">
        <tbody>
          <tr>
            <td class="py-4 pr-6 font-bold">CART SUBTOTAL</td>
            <td class="py-4 font-medium">$47.00</td>
          </tr>
          <tr class="border-gray border-b-1">
            <td class="py- pr-6 font-bold">Shipping and Handling</td>
            <td class="py-4 font-medium">FREE</td>
          </tr>
          <tr>
            <td class="py-4 pr-6 font-bold">ORDER TOTAL</td>
            <td class="text-primary py-4 font-medium">$47.00</td>
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
  </div>
</template>
