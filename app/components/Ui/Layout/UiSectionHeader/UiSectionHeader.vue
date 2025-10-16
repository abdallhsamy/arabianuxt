<script setup lang="ts">
import type { UiSectionHeaderProps } from "./UiSectionHeader.type";

defineProps<UiSectionHeaderProps>();
</script>

<template>
  <header
    class="flex items-center justify-between pb-2 border-b border-white/10"
  >
    <div class="flex items-center gap-3">
      <i v-if="icon" :class="['text-fuchsia-400 text-lg', icon]" />
      <div>
        <h2 class="text-lg font-semibold text-gray-100">{{ title }}</h2>
        <p v-if="subtitle" class="text-sm text-gray-400">{{ subtitle }}</p>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <slot name="actions" />
    </div>
  </header>
</template>
