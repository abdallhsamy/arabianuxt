import tailwindcss from "@tailwindcss/vite";
import { i18nConfig } from "./i18n/config";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxtjs/i18n", "@sentry/nuxt/module"],
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  pinia: {
    storesDirs: ["./app/stores/**"],
  },
  i18n: i18nConfig,
  sentry: {
    sourceMapsUploadOptions: {
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
    },
    autoInjectServerSentry: "top-level-import",
  },
  sourcemap: {
    client: "hidden",
  },
  runtimeConfig: {
    sentry: {
      enabled: process.env.SENTRY_ENABLED === "true",
      dsn: process.env.SENTRY_DSN,
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
    },
    public: {
      sentry: {
        enabled: process.env.SENTRY_ENABLED === "true",
        dsn: process.env.SENTRY_DSN,
      },
    },
  },
});
