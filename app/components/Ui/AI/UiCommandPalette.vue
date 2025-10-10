<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

interface Command {
  id: string
  label: string
  group?: string
  action: () => void
}

const props = defineProps<{ commands: Command[] }>()
const isOpen = ref(false)
const query = ref('')

const filtered = computed(() =>
    props.commands.filter(c => c.label.toLowerCase().includes(query.value.toLowerCase()))
)

const close = () => (isOpen.value = false)
const toggle = () => (isOpen.value = !isOpen.value)

const handleKey = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    toggle()
  } else if (e.key === 'Escape') close()
}
onMounted(() => document.addEventListener('keydown', handleKey))
onBeforeUnmount(() => document.removeEventListener('keydown', handleKey))
</script>

<template>
  <transition name="fade">
    <div
        v-if="isOpen"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-24 z-50"
        @click.self="close"
    >
      <div class="w-full max-w-lg bg-black/70 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
        <input
            v-model="query"
            placeholder="Search commands..."
            class="w-full bg-transparent text-gray-100 px-4 py-3 outline-none border-b border-white/10"
        />
        <ul class="max-h-64 overflow-y-auto divide-y divide-white/5">
          <li
              v-for="cmd in filtered"
              :key="cmd.id"
              class="px-4 py-2 text-gray-300 hover:bg-white/10 cursor-pointer"
              @click="cmd.action(); close()"
          >
            {{ cmd.label }}
          </li>
          <li v-if="!filtered.length" class="text-gray-500 text-center py-3 text-sm">No results</li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
