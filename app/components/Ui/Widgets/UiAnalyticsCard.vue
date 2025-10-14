<script setup lang="ts">
import UiProgressBar from "~/components/Ui/Data/UiProgressBar.vue";

export interface UiAnalyticsCardProps {
  label: string;
  value: string | number;
  change?: string;
  icon?: string;
  color?: "fuchsia" | "cyan" | "emerald" | "amber" | "rose";
  progress?: number;
}

const props = withDefaults(defineProps<UiAnalyticsCardProps>(), {
  color: "fuchsia",
});
</script>

<template>
  <div
    class="rounded-xl p-4 border border-white/10 bg-gradient-to-br backdrop-blur-xl shadow-lg transition-all"
    :class="{
      'from-fuchsia-600/20 to-cyan-600/10': props.color === 'fuchsia',
      'from-cyan-600/20 to-teal-600/10': props.color === 'cyan',
      'from-emerald-600/20 to-green-600/10': props.color === 'emerald',
      'from-amber-600/20 to-orange-600/10': props.color === 'amber',
      'from-rose-600/20 to-pink-600/10': props.color === 'rose',
    }"
  >
    <div class="flex justify-between items-start">
      <div>
        <p class="text-sm text-gray-400">{{ props.label }}</p>
        <h3 class="text-2xl font-semibold text-gray-100">{{ props.value }}</h3>
        <p v-if="props.change" class="text-xs mt-1">
          <span
            :class="
              props.change.startsWith('+')
                ? 'text-emerald-400'
                : 'text-rose-400'
            "
          >
            {{ props.change }}
          </span>
          vs last week
        </p>
      </div>
      <div v-if="props.icon" class="text-3xl text-gray-400">
        {{ props.icon }}
      </div>
    </div>
    <div v-if="props.progress" class="mt-4">
      <UiProgressBar :value="props.progress" :max="100" :show-label="false" />
    </div>
  </div>
</template>
