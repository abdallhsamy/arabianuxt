<script setup lang="ts">
import { useI18n } from "vue-i18n";

definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

const { t } = useI18n();
</script>

<template>
  <div class="mt-24 mx-auto text-center">
    <h1
      class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400 drop-shadow-[0_0_12px_rgba(236,72,153,0.3)]"
    >
      {{ t("pages.blank.title") }}
    </h1>
  </div>
</template>
