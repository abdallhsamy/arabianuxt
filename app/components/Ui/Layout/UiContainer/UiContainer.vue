<script setup lang="ts">
import {
  UiContainerDefaults,
  UiContainerMaxes,
  type UiContainerProps,
} from "./UiContainer.type";

withDefaults(defineProps<UiContainerProps>(), UiContainerDefaults);

const maxClass = {
  [UiContainerMaxes.Small]: "max-w-screen-sm",
  [UiContainerMaxes.Medium]: "max-w-screen-md",
  [UiContainerMaxes.Large]: "max-w-screen-lg",
  [UiContainerMaxes.ExtraLarge]: "max-w-screen-xl",
  [UiContainerMaxes.Full]: "w-full",
};
</script>

<template>
  <div
    class="mx-auto bg-gradient-to-br from-gray-900 via-gray-950 to-black rounded-2xl border border-white/10"
    :class="[maxClass[max], padded ? 'p-6' : '']"
  >
    <slot />
  </div>
</template>
