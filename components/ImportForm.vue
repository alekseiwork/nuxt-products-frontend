<script setup lang="ts">
import { ref } from "vue";
import { useApi } from "~/composables/useApi";

const file = ref<File | null>(null);
const loading = ref(false);
const result = ref<string>("");
const showErrors = ref(false);
const errors = ref<string[]>([]);
const duplicates = ref<string[]>([]);

const { importFile } = useApi();

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement | null;
  if (!target?.files?.[0]) return;
  file.value = target.files[0];
  result.value = "";
  errors.value = [];
  duplicates.value = [];
  showErrors.value = false;
};

const handleFileImport = async () => {
  if (!file.value) return;
  loading.value = true;
  result.value = "";
  errors.value = [];
  duplicates.value = [];
  showErrors.value = false;
  try {
    const res = await importFile(file.value);
    let resultText = `Импортировано: ${res.imported}`;
    if (res.duplicates?.length) {
      duplicates.value = res.duplicates;
      resultText += ` | Дубликатов пропущено: ${res.duplicates.length}`;
    }
    if (res.errors?.length) {
      errors.value = res.errors;
      resultText += ` | Ошибок: ${res.errors.length}`;
    }
    result.value = resultText;

    if (res.imported > 0) {
      file.value = null;
      const input = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;
      if (input) input.value = "";
    }
  } catch (err: unknown) {
    console.error("Ошибка импорта:", err);
    const errorMessage =
      err instanceof Error
        ? err.message
        : (err as { data: { message: string } }) ||
          "Неизвестная ошибка импорта";
    result.value = `Ошибка импорта: ${errorMessage}`;
  } finally {
    loading.value = false;
  }
};

const toggleErrors = () => {
  showErrors.value = !showErrors.value;
};

const getFileInfo = (file: File) => {
  const size = (file.size / 1024).toFixed(1);
  return `${file.name} (${size} KB)`;
};
</script>

<template>
  <UCard class="p-6 space-y-4">
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-2">
          Выберите файл для импорта
        </label>
        <input
          type="file"
          accept=".csv,.tsv,.xls,.xlsx"
          class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          @change="handleFileChange"
        />
        <p class="text-xs text-gray-500 mt-1">
          Поддерживаемые форматы: CSV, TSV, XLS, XLSX
        </p>
      </div>

      <div v-if="file" class="p-3 bg-gray-50 rounded-md">
        <p class="text-sm text-gray-700">
          Выбран файл: <strong>{{ getFileInfo(file) }}</strong>
        </p>
      </div>

      <UButton
        color="primary"
        :loading="loading"
        :disabled="!file"
        class="w-2xl p-6 text-blue-700 bg-blue-50 hover:bg-blue-100"
        @click="handleFileImport"
      >
        {{ loading ? "Импортирование..." : "Импортировать файл" }}
      </UButton>

      <div v-if="result" class="space-y-2">
        <div
          class="p-4 rounded-md"
          :class="{
            'bg-green-50 text-green-800':
              result.includes('Импортировано') && !result.includes('Ошибка'),
            'bg-red-50 text-red-800': result.includes('Ошибка'),
            'bg-yellow-50 text-yellow-800':
              result.includes('Дубликатов') || result.includes('Ошибок'),
          }"
        >
          {{ result }}
        </div>

        <div
          v-if="errors.length > 0 || duplicates.length > 0"
          class="space-y-2"
        >
          <UButton variant="soft" size="sm" @click="toggleErrors">
            {{ showErrors ? "Скрыть детали" : "Показать детали" }}
          </UButton>

          <div v-if="showErrors" class="space-y-3">
            <div v-if="duplicates.length > 0">
              <h4 class="font-semibold text-yellow-800">
                Дубликаты (пропущены):
              </h4>
              <div
                class="max-h-32 overflow-y-auto bg-yellow-50 p-2 rounded text-sm"
              >
                <div
                  v-for="(duplicate, index) in duplicates"
                  :key="index"
                  class="text-yellow-700"
                >
                  {{ duplicate }}
                </div>
              </div>
            </div>

            <div v-if="errors.length > 0">
              <h4 class="font-semibold text-red-800">Ошибки:</h4>
              <div
                class="max-h-32 overflow-y-auto bg-red-50 p-2 rounded text-sm"
              >
                <div
                  v-for="(error, index) in errors"
                  :key="index"
                  class="text-red-700"
                >
                  {{ error }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>
