<script setup lang="ts">
import { computed } from "vue";
import { type UiSkeletonProps, UiSkeletonVariants } from "./UiSkeleton.type";
import {
  UiSkeletonDefaultValues,
  UiSkeletonIntensityAlphas,
} from "./UiSkeleton.type";

const props = withDefaults(
  defineProps<UiSkeletonProps>(),
  UiSkeletonDefaultValues
);

/* Variant-based defaults */
const variantDefaults = computed(() => {
  switch (props.variant) {
    case UiSkeletonVariants.Circle:
    case UiSkeletonVariants.Avatar:
      return { height: props.width ?? "3rem", radius: "9999px" };
    case UiSkeletonVariants.Button:
      return { height: "2.5rem", radius: "0.375rem" };
    case UiSkeletonVariants.Card:
      return { height: "10rem", radius: "0.75rem" };
    case UiSkeletonVariants.Rect:
      return { height: props.height ?? "4rem" };
    default:
      return { height: "1rem" };
  }
});

/* Style layer */
const style = computed(() => ({
  width: typeof props.width === "number" ? `${props.width}px` : props.width,
  height:
    typeof props.height === "number"
      ? `${props.height}px`
      : props.height || variantDefaults.value.height,
  borderRadius:
    props.radius ??
    variantDefaults.value.radius ??
    "var(--skeleton-radius, 0.5rem)",
  "--skeleton-intensity": intensityAlpha.value,
  "--skeleton-speed":
    typeof props.speed === "number"
      ? `${props.speed}s`
      : (props.speed ?? "var(--skeleton-speed, 1.6s)"),
}));

/* Intensity mapping */
const intensityAlpha = computed(() => {
  switch (props.intensity) {
    case "subtle":
      return UiSkeletonIntensityAlphas.Subtle;
    case "medium":
      return UiSkeletonIntensityAlphas.Medium;
    case "strong":
      return UiSkeletonIntensityAlphas.Strong;
    default:
      return UiSkeletonIntensityAlphas.Medium;
  }
});

/* Dynamic class builder */
const classes = computed(() => {
  const anim =
    props.animation === "shimmer"
      ? "animate-skeleton-shimmer"
      : props.animation === "pulse"
        ? "animate-skeleton-pulse"
        : "";

  return [
    "relative overflow-hidden select-none",
    "bg-[var(--skeleton-bg)]",
    anim,
  ];
});
</script>

<template>
  <div v-if="props.variant === 'text' && props.lines > 1" class="space-y-2">
    <div
      v-for="n in props.lines"
      :key="n"
      :class="classes"
      :style="[style, { width: n === props.lines ? '80%' : style.width }]"
    />
  </div>

  <div v-else :class="classes" :style="style" />
</template>

<style scoped>
@keyframes skeleton-shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.animate-skeleton-shimmer {
  background-image: linear-gradient(
    90deg,
    var(--skeleton-bg) 25%,
    var(--skeleton-light) 37%,
    var(--skeleton-bg) 63%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer var(--skeleton-speed, 1.6s) infinite linear;
}

@keyframes skeleton-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

.animate-skeleton-pulse {
  animation: skeleton-pulse var(--skeleton-speed, 1.6s) ease-in-out infinite;
}
</style>
