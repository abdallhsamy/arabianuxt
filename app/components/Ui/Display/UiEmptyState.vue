<script setup lang="ts">
export interface UiEmptyStateProps {
  title: string
  description?: string
  icon?: string
  actionLabel?: string
}

const props = defineProps<UiEmptyStateProps>()
const emit = defineEmits<{ (e: 'action'): void }>()
</script>

<template>
  <div class="text-center p-8 border border-white/10 bg-white/5 rounded-xl backdrop-blur-xl">
    <div class="flex flex-col items-center space-y-3">
      <div v-if="props.icon" class="text-5xl opacity-70">{{ props.icon }}</div>
      <h3 class="text-lg text-gray-100 font-semibold">{{ props.title }}</h3>
      <p v-if="props.description" class="text-gray-400 text-sm">{{ props.description }}</p>
      <button
          v-if="props.actionLabel"
          class="mt-3 px-4 py-2 rounded-md bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white text-sm"
          @click="$emit('action')"
      >
        {{ props.actionLabel }}
      </button>
    </div>
  </div>
</template>
