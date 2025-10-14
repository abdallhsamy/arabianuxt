<script setup lang="ts">
import UiAccordion from "~/components/Ui/Common/UiAccordion.vue";
import { Info, Settings, Lock } from "lucide-vue-next";

definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

const { t } = useI18n();

const faqItems = [
  {
    id: "privacy",
    title: t("pages.componentAccordion.faq.privacy.title"),
    icon: Lock,
    content: t("pages.componentAccordion.faq.privacy.content"),
  },
  {
    id: "settings",
    title: t("pages.componentAccordion.faq.settings.title"),
    icon: Settings,
    content: t("pages.componentAccordion.faq.settings.content"),
  },
  {
    id: "docs",
    title: t("pages.componentAccordion.faq.docs.title"),
    icon: Info,
    content: t("pages.componentAccordion.faq.docs.content"),
  },
];
</script>

<template>
  <section class="space-y-10">
    <h1 class="page-title">{{ t("pages.componentAccordion.title") }}</h1>

    <!-- Vertical -->
    <div>
      <h2 class="section-title">
        {{ t("pages.componentAccordion.variants.vertical") }}
      </h2>
      <UiAccordion :items="faqItems" color="fuchsia" />
    </div>

    <!-- Multiple open vertical -->
    <div>
      <h2 class="section-title">
        {{ t("pages.componentAccordion.variants.multipleVertical") }}
      </h2>
      <UiAccordion :items="faqItems" multiple color="cyan" />
    </div>

    <!-- Horizontal -->
    <div>
      <h2 class="section-title">
        {{ t("pages.componentAccordion.variants.horizontal") }}
      </h2>
      <UiAccordion :items="faqItems" orientation="horizontal" color="emerald" />
    </div>
  </section>
</template>

<style scoped>
@reference "tailwindcss";
.page-title {
  @apply text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400;
}
.section-title {
  @apply text-lg font-semibold text-gray-300 mb-3;
}
</style>
