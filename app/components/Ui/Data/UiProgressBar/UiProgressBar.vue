<script setup lang="ts">
import { computed } from "vue";
import type { UiProgressBarProps } from "./UiProgressBar.type";

const props = withDefaults(defineProps<UiProgressBarProps>(), {
  max: 100,
  color: "from-fuchsia-600 to-cyan-600",
  showLabel: true,
});

const percent = computed(() =>
  Math.min(100, Math.max(0, (props.value / props.max) * 100))
);
</script>

<template>
  <div class="w-full">
    <div class="h-2 bg-white/10 rounded-full overflow-hidden">
      <div
        class="h-2 rounded-full bg-gradient-to-r transition-all duration-500"
        :class="props.color"
        :style="{ width: `${percent}%` }"
      ></div>
    </div>
    <p v-if="props.showLabel" class="text-xs mt-1 text-gray-400">
      {{ Math.round(percent) }}%
    </p>
  </div>
</template>
