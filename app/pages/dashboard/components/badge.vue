<script setup lang="ts">
import { Check, AlertCircle, Bell, Star } from 'lucide-vue-next'
import UiBadge from "~/components/Ui/Display/UiBadge.vue";
</script>

<template>
  <section class="space-y-10">
    <h1 class="page-title">Badge Component Examples</h1>

    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <!-- Solid Variants -->
      <div class="space-y-3">
        <h2 class="text-gray-300 text-sm font-semibold">Solid Variants</h2>
        <div class="flex flex-wrap gap-3">
          <UiBadge label="Fuchsia" color="fuchsia" variant="solid" />
          <UiBadge label="Cyan" color="cyan" variant="solid" />
          <UiBadge label="Emerald" color="emerald" variant="solid" />
          <UiBadge label="Rose" color="rose" variant="solid" />
        </div>
      </div>

      <!-- Soft Variants -->
      <div class="space-y-3">
        <h2 class="text-gray-300 text-sm font-semibold">Soft Variants</h2>
        <div class="flex flex-wrap gap-3">
          <UiBadge label="Info" color="cyan" variant="soft" />
          <UiBadge label="Success" color="emerald" variant="soft" />
          <UiBadge label="Warning" color="amber" variant="soft" />
          <UiBadge label="Error" color="rose" variant="soft" />
        </div>
      </div>

      <!-- Outline + Glow -->
      <div class="space-y-3">
        <h2 class="text-gray-300 text-sm font-semibold">Outline + Glow</h2>
        <div class="flex flex-wrap gap-3">
          <UiBadge label="New" variant="outline" color="fuchsia" glow />
          <UiBadge label="Beta" variant="outline" color="indigo" glow />
          <UiBadge label="Stable" variant="outline" color="emerald" glow />
        </div>
      </div>

      <!-- Dot Mode -->
      <div class="space-y-3">
        <h2 class="text-gray-300 text-sm font-semibold">Dot Badges</h2>
        <div class="flex flex-wrap items-center gap-3">
          <UiBadge dot color="fuchsia" />
          <UiBadge dot color="emerald" />
          <UiBadge dot color="amber" />
          <UiBadge dot color="rose" glow />
        </div>
      </div>

      <!-- With Icon -->
      <div class="space-y-3">
        <h2 class="text-gray-300 text-sm font-semibold">With Icon</h2>
        <div class="flex flex-wrap gap-3">
          <UiBadge :icon="Check" label="Done" color="emerald" variant="soft" />
          <UiBadge :icon="AlertCircle" label="Warning" color="amber" variant="solid" />
          <UiBadge :icon="Bell" label="Alerts" color="fuchsia" variant="glass" />
          <UiBadge :icon="Star" label="Premium" color="cyan" variant="outline" glow />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference "tailwindcss";
.page-title {
  @apply text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400;
}
</style>
