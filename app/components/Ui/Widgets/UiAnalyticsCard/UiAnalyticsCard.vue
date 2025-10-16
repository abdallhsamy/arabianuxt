<script setup lang="ts">
import UiProgressBar from "~/components/Ui/Data/UiProgressBar/UiProgressBar.vue";
import {
  UiAnalyticsCardColors,
  UiAnalyticsCardDefaults,
  type UiAnalyticsCardProps,
} from "./UiAnalyticsCard.type";

const props = withDefaults(
  defineProps<UiAnalyticsCardProps>(),
  UiAnalyticsCardDefaults
);
</script>

<template>
  <div
    class="rounded-xl p-4 border border-white/10 bg-gradient-to-br backdrop-blur-xl shadow-lg transition-all"
    :class="{
      'from-fuchsia-600/20 to-cyan-600/10':
        color === UiAnalyticsCardColors.Fuchsia,
      'from-cyan-600/20 to-teal-600/10': color === UiAnalyticsCardColors.Cyan,
      'from-emerald-600/20 to-green-600/10':
        color === UiAnalyticsCardColors.Emerald,
      'from-amber-600/20 to-orange-600/10':
        color === UiAnalyticsCardColors.Amber,
      'from-rose-600/20 to-pink-600/10': color === UiAnalyticsCardColors.Rose,
    }"
  >
    <div class="flex justify-between items-start">
      <div>
        <p class="text-sm text-gray-400">{{ label }}</p>
        <h3 class="text-2xl font-semibold text-gray-100">{{ value }}</h3>
        <p v-if="change" class="text-xs mt-1">
          <span
            :class="
              change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'
            "
          >
            {{ props.change }}
          </span>
          vs last week
        </p>
      </div>
      <div v-if="icon" class="text-3xl text-gray-400">
        {{ icon }}
      </div>
    </div>
    <div v-if="progress" class="mt-4">
      <UiProgressBar :value="progress" :max="100" :show-label="false" />
    </div>
  </div>
</template>
