<script setup lang="ts">
import {
  GradientCardDefaults,
  type GradientCardProps,
} from "./GradientCard.type";

const props = withDefaults(
  defineProps<GradientCardProps>(),
  GradientCardDefaults
);
</script>

<template>
  <div
    class="p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#8B5CF6_0%,#22D3EE_55%,#EC4899_100%)] animate-rotate-gradient"
    :class="props.class"
  >
    <div
      class="rounded-2xl bg-[rgba(15,17,23,0.94)] backdrop-blur-xl border border-white/10"
      :class="props.pad ? 'p-6' : ''"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
@property --angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

@keyframes rotate-gradient {
  to {
    --angle: 360deg;
  }
}

.animate-rotate-gradient {
  background-size: 200% 200%;
  animation: rotate-gradient 14s linear infinite;
}
</style>
