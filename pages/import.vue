<script setup lang="ts">
import ImportForm from "~/components/ImportForm.vue";
</script>

<template>
  <section>
    <h2 class="text-xl font-semibold mb-4">Импорт продуктов</h2>
    <p class="mb-4 text-gray-600">
      Вставьте ссылку на Google Sheet / CSV или загрузите Excel файл.
    </p>

    <ImportForm />
  </section>
</template>
