<script setup lang="ts">
import { ref } from "vue";
import type { UiTooltipProps, UiTooltipPosition } from "./UiTooltip.type";
import { UiTooltipDefaultPosition } from "./UiTooltip.type";

const props = defineProps<UiTooltipProps>();

const show = ref(false);

export const UiTooltipPositionClasses = {
  Top: "bottom-full mb-2",
  Bottom: "top-full mt-2",
  Left: "right-full mr-2",
  Right: "left-full ml-2",
  Start: "ltr:right-full rtl:left-full ltr:me-2 rtl:ms-2",
  End: "ltr:left-full rtl:right-full ltr:ms-2 rtl:me-2",
} as const;

const getPositionClass = (position: UiTooltipPosition | undefined): string => {
  const pos = position || UiTooltipDefaultPosition;
  return UiTooltipPositionClasses[pos as keyof typeof UiTooltipPositionClasses];
};
</script>

<template>
  <div
    class="relative inline-flex items-center justify-center"
    @mouseenter="show = true"
    @mouseleave="show = false"
  >
    <slot />
    <transition name="fade">
      <div
        v-if="show"
        class="absolute z-50 text-xs bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white px-2 py-1 rounded-md whitespace-nowrap"
        :class="getPositionClass(props.position)"
      >
        {{ props.text }}
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
