import tailwindcss from "@tailwindcss/vite";
import { i18nConfig } from "./i18n/config";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
      '@pinia/nuxt',
      '@nuxtjs/i18n',
  ],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
    pinia: {
        storesDirs: ['./app/stores/**'],
    },
    i18n: i18nConfig,
});
