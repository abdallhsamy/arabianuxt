<script setup lang="ts">
import UiPlayground from "~/components/Ui/Playground/UiPlayground.vue";
import type { PlaygroundSchema } from "~/components/Ui/Playground/UiPlayground.type";
import {
  accordionSchema,
  alertSchema,
  avatarSchema,
  badgeSchema,
  breadcrumbSchema,
  buttonSchema,
  cardSchema,
  chartAreaSchema,
  chartBarSchema,
  chartPieSchema,
  checkboxSchema,
  confirmDialogSchema,
  datePickerSchema,
  dividerSchema,
  dropdownSchema,
  emptyStateSchema,
  fileUploadSchema,
  inputSchema,
  loaderSpinnerSchema,
  modalSchema,
  paginationSchema,
  progressBarSchema,
  radioSchema,
  ratingSchema,
  richEditorSchema,
  selectSchema,
  skeletonSchema,
  sliderSchema,
  stepperSchema,
  switchSchema,
  tableSchema,
  tabsSchema,
  tagInputSchema,
  textareaSchema,
  themeSwitcherSchema,
  timelineSchema,
  tooltipSchema,
} from "~/playgrounds/schema";
import { useI18n } from "vue-i18n";

definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

const { t } = useI18n();

const schemas: PlaygroundSchema[] = [
  accordionSchema,
  alertSchema,
  avatarSchema,
  badgeSchema,
  breadcrumbSchema,
  buttonSchema,
  cardSchema,
  chartAreaSchema,
  chartBarSchema,
  chartPieSchema,
  checkboxSchema,
  confirmDialogSchema,
  datePickerSchema,
  dividerSchema,
  dropdownSchema,
  emptyStateSchema,
  fileUploadSchema,
  inputSchema,
  loaderSpinnerSchema,
  modalSchema,
  paginationSchema,
  progressBarSchema,
  radioSchema,
  ratingSchema,
  richEditorSchema,
  selectSchema,
  skeletonSchema,
  sliderSchema,
  stepperSchema,
  switchSchema,
  tableSchema,
  tabsSchema,
  tagInputSchema,
  textareaSchema,
  themeSwitcherSchema,
  timelineSchema,
  tooltipSchema,
];
</script>

<template>
  <section class="space-y-10">
    <h1
      class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400"
    >
      {{ t("pages.playground.title") }}
    </h1>
    <p class="text-gray-400 text-sm max-w-2xl">
      {{ t("pages.playground.description") }}
    </p>
    <div
      v-for="schema in schemas"
      key="`schema-${schema.name}`"
      class="space-y-4"
    >
      <h3
        class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400"
      >
        {{ schema.title }}
      </h3>
      <UiPlayground :schema="schema" />
    </div>
  </section>
</template>
