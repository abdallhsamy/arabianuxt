<script setup lang="ts">
import UiButton from '~/components/Ui/Common/UiButton.vue'
import { Check, X, ArrowRight, Bell } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const { t } = useI18n()
</script>

<template>
  <section class="space-y-10">
    <h1 class="page-title">{{ t('pages.componentButton.title') }}</h1>

    <!-- Variants -->
    <div class="grid gap-4 md:grid-cols-3">
      <UiButton :label="t('pages.buttons.variants.primary')" variant="primary" />
      <UiButton :label="t('pages.buttons.variants.secondary')" variant="secondary" />
      <UiButton :label="t('pages.buttons.variants.success')" variant="success" />
      <UiButton :label="t('pages.buttons.variants.danger')" variant="danger" />
      <UiButton :label="t('pages.buttons.variants.outline')" variant="outline" />
      <UiButton :label="t('pages.buttons.variants.glass')" variant="glass" />
    </div>

    <!-- With Icons -->
    <div class="grid gap-4 md:grid-cols-3">
      <UiButton :label="t('pages.buttons.labels.save')" :icon="Check" />
      <UiButton :label="t('pages.buttons.labels.cancel')" :icon="X" variant="secondary" />
      <UiButton :label="t('pages.buttons.labels.next')" :icon="ArrowRight" icon-position="right" />
    </div>

    <!-- States -->
    <div class="flex gap-4 flex-wrap">
      <UiButton :label="t('pages.buttons.labels.loading')" :loading="true" />
      <UiButton :label="t('pages.buttons.labels.disabled')" :disabled="true" />
      <UiButton :label="t('pages.buttons.fullWidth')" full />
    </div>

    <!-- Icon-only -->
    <div class="flex gap-4">
      <UiButton :icon="Bell" icon-only />
      <UiButton :icon="X" icon-only variant="danger" />
      <UiButton :icon="Check" icon-only variant="success" />
    </div>
  </section>
</template>

<style scoped>
@reference "tailwindcss";
.page-title {
  @apply text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400;
}
</style>
