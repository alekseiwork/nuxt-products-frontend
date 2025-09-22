<script setup lang="ts">
import ProductRow from "./ProductRow.vue";
import { useProducts } from "~/composables/useProducts";

const { filteredProducts, sortBy, sortOrder, changeSort } = useProducts();

const handleSort = (column: string) => {
  changeSort(column);
};
</script>

<template>
  <table class="min-w-full border">
    <thead class="bg-gray-100">
      <tr>
        <th
          class="px-4 py-2 text-left cursor-pointer"
          @click="handleSort('article')"
        >
          Артикул
          <span v-if="sortBy === 'article'">{{
            sortOrder === "ASC" ? "↑" : "↓"
          }}</span>
        </th>
        <th
          class="px-4 py-2 text-left cursor-pointer"
          @click="handleSort('name')"
        >
          Название
          <span v-if="sortBy === 'name'">{{
            sortOrder === "ASC" ? "↑" : "↓"
          }}</span>
        </th>
        <th
          class="px-4 py-2 text-left cursor-pointer"
          @click="handleSort('brand')"
        >
          Бренд
          <span v-if="sortBy === 'brand'">{{
            sortOrder === "ASC" ? "↑" : "↓"
          }}</span>
        </th>
        <th
          class="px-4 py-2 text-left cursor-pointer"
          @click="handleSort('price')"
        >
          Цена
          <span v-if="sortBy === 'price'">{{
            sortOrder === "ASC" ? "↑" : "↓"
          }}</span>
        </th>
        <th
          class="px-4 py-2 text-left cursor-pointer"
          @click="handleSort('color')"
        >
          Цвет
          <span v-if="sortBy === 'color'">{{
            sortOrder === "ASC" ? "↑" : "↓"
          }}</span>
        </th>
        <th
          class="px-4 py-2 text-left cursor-pointer"
          @click="handleSort('country')"
        >
          Страна-изготовитель
          <span v-if="sortBy === 'country'">{{
            sortOrder === "ASC" ? "↑" : "↓"
          }}</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <ProductRow v-for="p in filteredProducts" :key="p.id" :product="p" />
    </tbody>
  </table>
</template>
