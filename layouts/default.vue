<template>
  <UContainer>
    <header class="flex items-center justify-between py-4 border-b mb-6">
      <h1 class="text-2xl font-bold">Мини-каталог</h1>
      <nav class="flex gap-4">
        <NuxtLink to="/products" class="hover:underline">Продукты</NuxtLink>
        <NuxtLink to="/import" class="hover:underline">Импорт</NuxtLink>
      </nav>
    </header>

    <main>
      <slot />
    </main>
  </UContainer>
</template>
