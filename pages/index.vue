<script setup lang="ts">
import { useRouter } from "nuxt/app";
import { onMounted } from "vue";

const router = useRouter();

onMounted(() => {
  router.push("/products");
});
</script>

<template>
  <div class="text-center py-20">
    <p>Загрузка...</p>
  </div>
</template>
