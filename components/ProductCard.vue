<script setup lang="ts">
import type { Product } from "~/types/product";
defineProps<{ product: Product }>();
</script>

<template>
  <UCard class="p-4 space-y-2">
    <h3 class="font-bold text-lg">{{ product.name }}</h3>
    <p><b>Артикул:</b> {{ product.article }}</p>
    <p v-if="product.brand"><b>Бренд:</b> {{ product.brand }}</p>
    <p v-if="product.price"><b>Цена:</b> {{ product.price }}</p>
    <p v-if="product.color"><b>Цвет:</b> {{ product.color }}</p>
    <p v-if="product.country"><b>Страна:</b> {{ product.country }}</p>
  </UCard>
</template>
