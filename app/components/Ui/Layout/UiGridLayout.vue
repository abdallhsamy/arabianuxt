<script setup lang="ts">
export interface UiGridLayoutProps {
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: "sm" | "md" | "lg" | "xl";
  responsive?: boolean;
}

withDefaults(defineProps<UiGridLayoutProps>(), {
  cols: 3,
  gap: "md",
  responsive: true,
});

const gapClass = {
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
};
</script>

<template>
  <div
    class="grid"
    :class="[
      gapClass[gap],
      responsive
        ? `grid-cols-1 sm:grid-cols-2 md:grid-cols-${cols}`
        : `grid-cols-${cols}`,
    ]"
  >
    <slot />
  </div>
</template>
