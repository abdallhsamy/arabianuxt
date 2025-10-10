<script setup lang="ts">
import { computed } from 'vue'

export interface UiPaginationProps {
  page: number
  total: number
  perPage: number
}

const props = defineProps<UiPaginationProps>()
const emit = defineEmits<{ (e: 'update:page', v: number): void }>()

const totalPages = computed(() => Math.ceil(props.total / props.perPage))
const pages = computed(() =>
    Array.from({ length: totalPages.value }, (_, i) => i + 1)
)

const setPage = (p: number): void => {
  if (p >= 1 && p <= totalPages.value) emit('update:page', p)
}
</script>

<template>
  <div class="flex items-center gap-2 justify-center text-gray-300 mt-4">
    <button
        class="px-2 py-1 rounded bg-white/5 hover:bg-white/10 disabled:opacity-30"
        :disabled="props.page <= 1"
        @click="setPage(props.page - 1)"
    >
      Prev
    </button>

    <button
        v-for="p in pages"
        :key="p"
        class="px-3 py-1 rounded transition-all"
        :class="p === props.page
        ? 'bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white'
        : 'bg-white/5 hover:bg-white/10'"
        @click="setPage(p)"
    >
      {{ p }}
    </button>

    <button
        class="px-2 py-1 rounded bg-white/5 hover:bg-white/10 disabled:opacity-30"
        :disabled="props.page >= totalPages"
        @click="setPage(props.page + 1)"
    >
      Next
    </button>
  </div>
</template>
