<script setup lang="ts">
export interface UiAgentCardProps {
  name: string;
  description: string;
  avatar?: string;
  model?: string;
  active?: boolean;
}

const props = defineProps<UiAgentCardProps>();
</script>

<template>
  <div
    class="flex items-start gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
    :class="{ 'ring-2 ring-fuchsia-500/50': props.active }"
  >
    <img v-if="avatar" :src="avatar" class="w-12 h-12 rounded-full" />
    <div>
      <h4 class="text-gray-100 font-semibold flex items-center gap-2">
        {{ name }}
        <span v-if="model" class="text-xs text-gray-400 font-normal"
          >({{ model }})</span
        >
      </h4>
      <p class="text-sm text-gray-400 mt-1">{{ description }}</p>
    </div>
  </div>
</template>
