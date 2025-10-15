<script setup lang="ts">
import type { AvailableLocale, LanguageDirection } from "~~/i18n/config";
import UiToaster from "~/components/Ui/UiToaster/UiToaster.vue";

const headMeta = useLocaleHead({
  dir: true,
  seo: true,
});

useHead({
  htmlAttrs: {
    dir: headMeta.value.htmlAttrs.dir as LanguageDirection,
    lang: headMeta.value.htmlAttrs.lang as AvailableLocale,
  },
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <UiToaster id="global-toaster" position="top-right" />
  </NuxtLayout>
</template>
