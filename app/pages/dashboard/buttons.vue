<script setup lang="ts">
import { ref } from 'vue'
import UiButton from '~/components/Ui/Common/UiButton.vue'
import { Check, X, ArrowRight, Download, Bell, Heart, Star, Power } from 'lucide-vue-next'

const variants = ['primary', 'secondary', 'success', 'danger', 'outline', 'glass']
const toggleHeart = ref(false)
const togglePower = ref(true)
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

    <!-- Regular variants -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UiButton variant="primary" label="Primary" />
      <UiButton variant="secondary" label="Secondary" />
      <UiButton variant="success" label="Success" :icon="Check" />
      <UiButton variant="danger" label="Danger" :icon="X" />
      <UiButton variant="outline" label="Outline" />
      <UiButton variant="glass" label="Glass" />
    </div>

    <!-- Sizes -->
    <div class="flex flex-wrap items-center gap-4">
      <UiButton label="Small" size="sm" />
      <UiButton label="Medium" size="md" />
      <UiButton label="Large" size="lg" />
    </div>

    <!-- Icon only -->
    <div class="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
      <h2 class="text-gray-300 font-medium mb-4">Icon-only Buttons</h2>
      <div class="flex flex-wrap items-center gap-4">
        <UiButton :icon="Bell" icon-only variant="primary" aria-label="Notifications" />
        <UiButton :icon="Check" icon-only variant="success" aria-label="Confirm" />
        <UiButton :icon="X" icon-only variant="danger" aria-label="Close" />
        <UiButton :icon="Star" icon-only variant="glass" aria-label="Star" />
      </div>
    </div>

    <!-- Toggle buttons -->
    <div class="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
      <h2 class="text-gray-300 font-medium mb-4">Toggle Buttons</h2>
      <div class="flex flex-wrap items-center gap-4">
        <UiButton :icon="Heart" icon-only toggleable v-model="toggleHeart" aria-label="Favorite" />
        <UiButton :icon="Power" toggleable v-model="togglePower" label="Power" variant="outline" />
      </div>
      <p class="mt-3 text-gray-400 text-sm">
        Favorite: <span class="text-fuchsia-400">{{ toggleHeart ? 'On' : 'Off' }}</span> — Power:
        <span class="text-cyan-400">{{ togglePower ? 'On' : 'Off' }}</span>
      </p>
    </div>

    <!-- Accessibility -->
    <div class="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
      <h2 class="text-gray-300 font-medium mb-4">Accessibility Demo</h2>
      <p class="text-gray-400 text-sm mb-4">Try navigating with Tab / Shift+Tab — focus rings are visible.</p>
      <div class="flex gap-4">
        <UiButton label="Focus Me" />
        <UiButton label="Accessible" variant="outline" />
        <UiButton :icon="Check" label="Keyboard OK" variant="glass" />
      </div>
    </div>
  </section>
</template>

