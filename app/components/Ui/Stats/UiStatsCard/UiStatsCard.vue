<script setup lang="ts">
import { UiStatsCardDefaults, type UiStatsCardProps } from "./UiStatsCard.type";

const props = withDefaults(
  defineProps<UiStatsCardProps>(),
  UiStatsCardDefaults
);
</script>

<template>
  <div
    class="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4"
  >
    <div class="text-sm text-gray-400">{{ props.label }}</div>
    <div class="mt-1 text-2xl font-semibold text-gray-100">
      {{ props.value }}
    </div>
    <div class="mt-2 text-xs">
      <span :class="props.delta >= 0 ? 'text-emerald-300' : 'text-rose-300'">
        {{ props.delta >= 0 ? "+" : "" }}{{ props.delta }}%
      </span>
      <span class="text-gray-400 ms-2">{{ props.hint }}</span>
    </div>
  </div>
</template>
