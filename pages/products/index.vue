<script setup lang="ts">
import ProductTable from "~/components/ProductTable.vue";
import { useProducts } from "~/composables/useProducts";

const { clearProducts } = useApi();
const { filteredProducts, loading, error, refresh } = useProducts();
</script>

<template>
  <section class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Список продуктов</h1>
      <div class="flex gap-2">
        <UButton variant="outline" :loading="loading" @click="clearProducts"
          >Очистить таблицу</UButton
        >
        <UButton variant="outline" :loading="loading" @click="refresh"
          >Обновить</UButton
        >
      </div>
    </div>

    <!-- Ошибки -->
    <UAlert
      v-if="error"
      color="error"
      variant="soft"
      :title="error"
      class="mb-4"
    />

    <!-- Результаты -->
    <div class="mb-4 text-sm text-gray-600">
      Найдено продуктов: {{ filteredProducts.length }}
    </div>

    <!-- Загрузка -->
    <div v-if="loading">Загрузка...</div>

    <!-- Таблица -->
    <ProductTable v-else :products="filteredProducts" />
  </section>
</template>
