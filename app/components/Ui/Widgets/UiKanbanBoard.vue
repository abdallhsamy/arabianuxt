<script setup lang="ts">
import { ref } from 'vue'

export interface KanbanTask {
  id: string
  title: string
  status: 'todo' | 'progress' | 'done'
}

const props = defineProps<{ modelValue: KanbanTask[] }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: KanbanTask[]): void }>()

const columns = ['todo', 'progress', 'done'] as const

const moveTask = (id: string, newStatus: KanbanTask['status']) => {
  const tasks = props.modelValue.map(t =>
      t.id === id ? { ...t, status: newStatus } : t
  )
  emit('update:modelValue', tasks)
}
</script>

<template>
  <div class="grid md:grid-cols-3 gap-4">
    <div
        v-for="col in columns"
        :key="col"
        class="rounded-xl bg-white/5 border border-white/10 p-4 backdrop-blur-xl"
    >
      <h3 class="text-gray-100 font-semibold mb-3 capitalize">
        {{ col }}
      </h3>
      <div class="space-y-2">
        <div
            v-for="task in modelValue.filter(t => t.status === col)"
            :key="task.id"
            class="p-3 rounded-lg bg-white/10 border border-white/10 text-gray-100 text-sm flex justify-between items-center"
        >
          {{ task.title }}
          <div class="flex gap-1">
            <button
                v-for="next in columns"
                :key="next"
                v-if="next !== col"
                class="text-xs text-gray-400 hover:text-fuchsia-400"
                @click="moveTask(task.id, next)"
            >
              → {{ next }}
            </button>
          </div>
        </div>
        <p v-if="!modelValue.some(t => t.status === col)" class="text-gray-500 text-xs">
          No tasks
        </p>
      </div>
    </div>
  </div>
</template>
