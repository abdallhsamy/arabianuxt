<script setup lang="ts">
import { computed } from "vue";
import {
  UiBadgeStatusColors,
  UiBadgeStatusDefaults,
  type UiBadgeStatusProps,
  UiBadgeStatusSizes,
} from "./UiBadgeStatus.type";

const props = withDefaults(
  defineProps<UiBadgeStatusProps>(),
  UiBadgeStatusDefaults
);

const colorClass = computed(
  () =>
    ({
      [UiBadgeStatusColors.Default]: "bg-white/10 text-gray-200",
      [UiBadgeStatusColors.Success]: "bg-emerald-500/20 text-emerald-300",
      [UiBadgeStatusColors.Warning]: "bg-amber-500/20 text-amber-300",
      [UiBadgeStatusColors.Error]: "bg-rose-500/20 text-rose-300",
      [UiBadgeStatusColors.Info]: "bg-cyan-500/20 text-cyan-300",
    })[props.color]
);

const sizeClass = computed(
  () =>
    ({
      [UiBadgeStatusSizes.Small]: "text-xs px-2 py-0.5",
      [UiBadgeStatusSizes.Medium]: "text-sm px-3 py-1",
      [UiBadgeStatusSizes.Large]: "text-base px-4 py-1.5",
    })[props.size]
);
</script>

<template>
  <span
    class="inline-flex items-center gap-1 font-medium"
    :class="[colorClass, sizeClass, pill ? 'rounded-full' : 'rounded-md']"
  >
    <i v-if="icon" :class="icon"></i>
    {{ label }}
  </span>
</template>
