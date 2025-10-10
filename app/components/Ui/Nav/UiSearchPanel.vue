<script setup lang="ts">
import { ref, watch } from 'vue'

export interface SearchItem {
  id: string
  title: string
  category?: string
}

const props = defineProps<{ modelValue: boolean; items: SearchItem[] }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void }>()

const query = ref('')
const filtered = ref<SearchItem[]>(props.items)

watch(query, () => {
  const q = query.value.toLowerCase()
  filtered.value = props.items.filter(i => i.title.toLowerCase().includes(q))
})
</script>

<template>
  <transition name="fade">
    <div
        v-if="props.modelValue"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-start pt-24 z-50"
        @click.self="emit('update:modelValue', false)"
    >
      <div class="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6">
        <input
            v-model="query"
            type="text"
            placeholder="Search..."
            class="w-full bg-transparent border-b border-white/10 text-gray-100 placeholder-gray-500 pb-2 outline-none"
        />
        <ul class="mt-4 max-h-64 overflow-y-auto text-sm">
          <li
              v-for="i in filtered"
              :key="i.id"
              class="px-2 py-1 hover:bg-white/10 cursor-pointer rounded-md text-gray-300"
          >
            {{ i.title }}
            <span v-if="i.category" class="text-gray-500 text-xs ml-2">({{ i.category }})</span>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
