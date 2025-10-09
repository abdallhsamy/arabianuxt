<script setup lang="ts">
import UiButton from '~/components/Ui/Common/UiButton.vue'
import { Check, X, ArrowRight, Bell } from 'lucide-vue-next'
</script>

<template>
  <section class="space-y-10">
    <h1 class="page-title">Button Component Examples</h1>

    <!-- Variants -->
    <div class="grid gap-4 md:grid-cols-3">
      <UiButton label="Primary" variant="primary" />
      <UiButton label="Secondary" variant="secondary" />
      <UiButton label="Success" variant="success" />
      <UiButton label="Danger" variant="danger" />
      <UiButton label="Outline" variant="outline" />
      <UiButton label="Glass" variant="glass" />
    </div>

    <!-- With Icons -->
    <div class="grid gap-4 md:grid-cols-3">
      <UiButton label="Save" :icon="Check" />
      <UiButton label="Cancel" :icon="X" variant="secondary" />
      <UiButton label="Next" :icon="ArrowRight" icon-position="right" />
    </div>

    <!-- States -->
    <div class="flex gap-4 flex-wrap">
      <UiButton label="Loading" :loading="true" />
      <UiButton label="Disabled" :disabled="true" />
      <UiButton label="Full Width" full />
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
@reference "~/assets/css/main.css";

.page-title {
  @apply text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400;
}
</style>
