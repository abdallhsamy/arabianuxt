<script setup lang="ts">
export interface TimelineEvent {
  title: string
  description?: string
  time?: string
  color?: string
}

defineProps<{ events: TimelineEvent[] }>()
</script>

<template>
  <ul class="relative border-l border-white/10 pl-4 space-y-6">
    <li v-for="(event, i) in events" :key="i" class="relative">
      <div
          class="absolute -left-2 top-1 w-3 h-3 rounded-full"
          :class="event.color || 'bg-gradient-to-r from-fuchsia-500 to-cyan-500'"
      ></div>
      <div class="ms-2">
        <p class="font-semibold text-gray-100">{{ event.title }}</p>
        <p v-if="event.description" class="text-sm text-gray-400">
          {{ event.description }}
        </p>
        <p v-if="event.time" class="text-xs text-gray-500 mt-1">
          {{ event.time }}
        </p>
      </div>
    </li>
  </ul>
</template>
