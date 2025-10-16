<script setup lang="ts">
import {
  UiGridLayoutDefaults,
  UiGridLayoutGaps,
  type UiGridLayoutProps,
} from "./UiGridLayout.type";

withDefaults(defineProps<UiGridLayoutProps>(), UiGridLayoutDefaults);

const gapClass = {
  [UiGridLayoutGaps.Small]: "gap-2",
  [UiGridLayoutGaps.Medium]: "gap-4",
  [UiGridLayoutGaps.Large]: "gap-6",
  [UiGridLayoutGaps.ExtraLarge]: "gap-8",
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
