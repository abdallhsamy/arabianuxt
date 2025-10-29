<script setup lang="ts">
import {
  UiStatsOverviewColors,
  type UiStatsOverviewProps,
} from "./UiStatsOverview.type";

defineProps<UiStatsOverviewProps>();
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div
      v-for="s in stats"
      :key="s.label"
      class="rounded-xl border border-white/10 bg-gradient-to-br p-4 backdrop-blur-xl"
      :class="{
        'from-fuchsia-500/20 to-cyan-500/10':
          s.color === UiStatsOverviewColors.Fuchsia,
        'from-cyan-500/20 to-teal-500/10':
          s.color === UiStatsOverviewColors.Cyan,
        'from-emerald-500/20 to-green-500/10':
          s.color === UiStatsOverviewColors.Emerald,
        'from-amber-500/20 to-orange-500/10':
          s.color === UiStatsOverviewColors.Amber,
        'from-rose-500/20 to-pink-500/10':
          s.color === UiStatsOverviewColors.Rose,
      }"
    >
      <div class="flex justify-between items-start">
        <div>
          <p class="text-sm text-gray-400">{{ s.label }}</p>
          <h3 class="text-xl font-semibold text-gray-100">{{ s.value }}</h3>
          <p v-if="s.change" class="text-xs mt-1 text-gray-400">
            <span
              :class="
                s.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'
              "
              >{{ s.change }}</span
            >
            vs last week
          </p>
        </div>
        <div v-if="s.icon" class="text-2xl text-gray-400">{{ s.icon }}</div>
      </div>
    </div>
  </div>
</template>
