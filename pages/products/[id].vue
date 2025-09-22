<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { Product } from "~/types/product";

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const base = config.public.apiBase || "http://localhost:3001";

const product = ref<Product | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

onMounted(async () => {
  loading.value = true;
  try {
    const res = await $fetch<Product>(`${base}/products/${route.params.id}`);
    product.value = res;
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message;
    } else {
      error.value = "Ошибка загрузки продукта";
    }
  } finally {
    loading.value = false;
  }
});

function goBack() {
  router.push("/products");
}
</script>

<template>
  <section class="p-6">
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <h1 class="text-xl font-bold">Детали продукта</h1>
          <UButton variant="outline" @click="goBack">Назад</UButton>
        </div>
      </template>

      <div v-if="loading">Загрузка...</div>
      <UAlert v-else-if="error" color="warning" variant="soft" :title="error" />

      <div v-else-if="product" class="space-y-4">
        <div><strong>Артикул:</strong> {{ product.article }}</div>
        <div><strong>Название:</strong> {{ product.name }}</div>
        <div><strong>Бренд:</strong> {{ product.brand }}</div>
        <div><strong>Цена:</strong> {{ product.price }} ₽</div>
        <div><strong>Цвет:</strong> {{ product.color }}</div>
        <div><strong>Страна:</strong> {{ product.country }}</div>
      </div>
    </UCard>
  </section>
</template>
