import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  devtools: { enabled: true },

  modules: ["@nuxt/eslint", "@nuxt/ui"],

  vite: {
    plugins: [tailwindcss()],
  },

  css: ["~/assets/tailwind.css"],

  runtimeConfig: {
    public: {
      apiBase: "http://localhost:3001",
    },
  },
});
