// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    // Отключаем требование self-closing для void элементов
    "vue/html-self-closing": ["off"],
  },
});
