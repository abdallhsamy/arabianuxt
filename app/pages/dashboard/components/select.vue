<script setup lang="ts">
import UiSelect from "~/components/Ui/Form/UiSelect.vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

const { t } = useI18n();

const country = ref("");
const color = ref("");

const countries = [
  { label: t("pages.componentSelect.countries.saudiArabia"), value: "sa" },
  {
    label: t("pages.componentSelect.countries.unitedArabEmirates"),
    value: "ae",
  },
  { label: t("pages.componentSelect.countries.kuwait"), value: "kw" },
  { label: t("pages.componentSelect.countries.qatar"), value: "qa" },
  { label: t("pages.componentSelect.countries.egypt"), value: "eg" },
];
const colors = [
  { label: t("pages.componentSelect.colors.fuchsia"), value: "fuchsia" },
  { label: t("pages.componentSelect.colors.emerald"), value: "emerald" },
  { label: t("pages.componentSelect.colors.cyan"), value: "cyan" },
  { label: t("pages.componentSelect.colors.rose"), value: "rose" },
];
</script>

<template>
  <section class="space-y-10">
    <h1 class="page-title">{{ t("pages.componentSelect.title") }}</h1>

    <!-- Simple select -->
    <UiSelect
      v-model="country"
      :label="t('pages.componentSelect.country')"
      :options="countries"
      :placeholder="t('pages.componentSelect.selectCountry')"
    />

    <!-- Searchable -->
    <UiSelect
      v-model="color"
      :label="t('pages.componentSelect.favoriteColor')"
      :options="colors"
      searchable
      :parent-theme="'gradient'"
      :message="t('pages.componentSelect.chooseThemeColor')"
    />

    <!-- Error state -->
    <UiSelect
      v-model="country"
      :label="t('pages.componentSelect.requiredField')"
      :options="countries"
      state="error"
      :message="t('pages.componentSelect.fieldRequired')"
    />
  </section>
</template>

<style scoped>
@reference "tailwindcss";
.page-title {
  @apply text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400;
}
</style>
