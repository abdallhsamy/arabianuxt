<script setup lang="ts">
export interface UiPaginationProps { page: number; pages: number }
const props = defineProps<UiPaginationProps>()
const emit = defineEmits<{ (e:'update:page', v:number): void }>()
const go = (p: number): void => emit('update:page', Math.min(Math.max(1, p), props.pages))
</script>

<template>
  <div class="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 backdrop-blur-xl p-1 text-sm text-gray-100">
    <button class="px-2 py-1 rounded hover:bg-white/10 disabled:opacity-50" :disabled="props.page<=1" @click="go(props.page-1)">Prev</button>
    <span class="px-2">Page {{ props.page }} / {{ props.pages }}</span>
    <button class="px-2 py-1 rounded hover:bg-white/10 disabled:opacity-50" :disabled="props.page>=props.pages" @click="go(props.page+1)">Next</button>
  </div>
</template>
