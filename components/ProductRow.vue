<script setup lang="ts">
import type { Product } from "~/types/product";
defineProps<{ product: Product }>();
</script>

<template>
  <tr class="border-b hover:bg-gray-50">
    <td class="px-4 py-2">{{ product.article }}</td>
    <td class="px-4 py-2">
      <NuxtLink :to="`/products/${product.id}`" class="text-blue-600">
        {{ product.name }}
      </NuxtLink>
    </td>
    <td class="px-4 py-2">{{ product.brand }}</td>
    <td class="px-4 py-2">{{ product.price }}</td>
    <td class="px-4 py-2">{{ product.color }}</td>
    <td class="px-4 py-2">{{ product.country }}</td>
  </tr>
</template>
