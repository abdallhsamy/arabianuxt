<script setup lang="ts">
import UiButton from '~/components/Ui/Common/UiButton.vue'
import { Check, X, ArrowRight, Download, Bell } from 'lucide-vue-next'

const variants = ['primary', 'secondary', 'success', 'danger', 'outline', 'glass']
const sizes = ['sm', 'md', 'lg']
</script>

<template>
  <section class="space-y-10">
    <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400">
      Button Components
    </h1>
    <p class="text-gray-400 text-sm">Explore all button styles, sizes, icons, and states.</p>

    <!-- Variants -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
          v-for="variant in variants"
          :key="variant"
          class="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
      >
        <h2 class="text-gray-300 font-medium mb-4 capitalize">{{ variant }} Variant</h2>
        <div class="flex flex-wrap gap-3">
          <UiButton :variant="variant" label="Default" />
          <UiButton :variant="variant" label="With Icon" :icon="Check" />
          <UiButton :variant="variant" label="Loading" :loading="true" />
          <UiButton :variant="variant" label="Disabled" :disabled="true" />
        </div>
      </div>
    </div>

    <!-- Sizes -->
    <div class="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
      <h2 class="text-gray-300 font-medium mb-4">Sizes</h2>
      <div class="flex flex-wrap items-center gap-3">
        <UiButton label="Small" size="sm" />
        <UiButton label="Medium" size="md" />
        <UiButton label="Large" size="lg" />
      </div>
    </div>

    <!-- Icons -->
    <div class="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
      <h2 class="text-gray-300 font-medium mb-4">Buttons with Icons</h2>
      <div class="flex flex-wrap gap-3">
        <UiButton label="Save" :icon="Check" />
        <UiButton label="Cancel" :icon="X" variant="secondary" />
        <UiButton label="Next" :icon="ArrowRight" icon-position="right" variant="primary" />
        <UiButton label="Download" :icon="Download" variant="success" />
        <UiButton label="Notify" :icon="Bell" variant="glass" />
      </div>
    </div>

    <!-- Full Width -->
    <div class="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
      <h2 class="text-gray-300 font-medium mb-4">Full Width</h2>
      <UiButton label="Full Button" full variant="primary" size="lg" :icon="ArrowRight" icon-position="right" />
    </div>
  </section>
</template>
