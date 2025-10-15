<script setup lang="ts">
import type { TagChipsProps } from "./TagChips.type";

defineProps<TagChipsProps>();
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <span
      v-for="t in tags"
      :key="t"
      class="text-[11px] px-2 py-1 rounded-full border bg-white/5 text-gray-200 border-white/10"
    >
      {{ t }}
    </span>
  </div>
</template>
