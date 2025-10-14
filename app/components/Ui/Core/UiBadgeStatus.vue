<script setup lang="ts">
import { computed } from "vue";

export interface UiBadgeStatusProps {
  label: string;
  color?: "default" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md" | "lg";
  pill?: boolean;
  icon?: string;
}

const props = withDefaults(defineProps<UiBadgeStatusProps>(), {
  color: "default",
  size: "md",
  pill: true,
});

const colorClass = computed(
  () =>
    ({
      default: "bg-white/10 text-gray-200",
      success: "bg-emerald-500/20 text-emerald-300",
      warning: "bg-amber-500/20 text-amber-300",
      error: "bg-rose-500/20 text-rose-300",
      info: "bg-cyan-500/20 text-cyan-300",
    })[props.color]
);

const sizeClass = computed(
  () =>
    ({
      sm: "text-xs px-2 py-0.5",
      md: "text-sm px-3 py-1",
      lg: "text-base px-4 py-1.5",
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
