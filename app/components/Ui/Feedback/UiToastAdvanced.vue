<script setup lang="ts">
import { ref } from 'vue'
export type ToastType = 'info' | 'success' | 'warning' | 'error'
export interface Toast { id: string; type?: ToastType; text: string; duration?: number }
const toasts = ref<Toast[]>([])
const push = (t: Omit<Toast, 'id'> & { id?: string }): string => {
  const id = t.id ?? (globalThis.crypto?.randomUUID?.() ?? String(Date.now()))
  const toast: Toast = { id, type: 'info', duration: 3500, ...t }
  toasts.value = [toast, ...toasts.value]
  window.setTimeout(() => dismiss(id), toast.duration)
  return id
}
const dismiss = (id: string): void => { toasts.value = toasts.value.filter(t => t.id !== id) }
defineExpose({ push, dismiss })
</script>

<template>
  <div class="fixed z-[60] top-6 right-6 space-y-2 w-80">
    <div v-for="t in toasts" :key="t.id" class="rounded-xl border border-white/10 backdrop-blur-xl p-3 text-sm shadow-2xl"
         :class="t.type==='success' ? 'bg-emerald-500/15 text-emerald-100' :
                 t.type==='warning' ? 'bg-amber-500/15 text-amber-100' :
                 t.type==='error' ? 'bg-rose-500/15 text-rose-100' : 'bg-white/10 text-gray-100'">
      <div class="flex items-start gap-2">
        <div class="flex-1">{{ t.text }}</div>
        <button class="opacity-70 hover:opacity-100" @click="dismiss(t.id)">✕</button>
      </div>
    </div>
  </div>
</template>
