<script setup lang="ts">
import { ref, computed } from 'vue'

export type LogLevel = 'debug' | 'info' | 'warn' | 'error'
export interface LogItem { id: string; ts: number; level: LogLevel; message: string }

const props = withDefaults(defineProps<{
  modelValue?: LogItem[]
  autoScroll?: boolean
}>(), {
  modelValue: () => [],
  autoScroll: true,
})

const emit = defineEmits<{ (e:'update:modelValue', v: LogItem[]): void }>()

const levels = ref<Record<LogLevel, boolean>>({ debug: true, info: true, warn: true, error: true })
const paused = ref(false)

const show = computed(() =>
    (props.modelValue || []).filter(l => levels.value[l.level])
)

const clear = (): void => emit('update:modelValue', [])
const toggle = (lvl: LogLevel): void => { levels.value[lvl] = !levels.value[lvl] }
</script>

<template>
  <div class="rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl overflow-hidden">
    <header class="flex items-center gap-2 px-3 py-2 border-b border-white/10 text-sm text-gray-300">
      <button class="px-2 py-1 rounded bg-white/5 hover:bg-white/10" @click="paused = !paused">{{ paused ? 'Resume' : 'Pause' }}</button>
      <button class="px-2 py-1 rounded bg-white/5 hover:bg-white/10" @click="clear">Clear</button>
      <div class="ms-auto flex items-center gap-2">
        <label v-for="l in ['debug','info','warn','error']" :key="l" class="flex items-center gap-1">
          <input type="checkbox" class="accent-fuchsia-500" :checked="levels[l as LogLevel]" @change="toggle(l as LogLevel)" />
          <span class="capitalize">{{ l }}</span>
        </label>
      </div>
    </header>

    <div class="max-h-72 overflow-auto font-mono text-[12px]">
      <div v-for="log in show" :key="log.id" class="px-3 py-1.5 whitespace-pre">
        <span class="opacity-50 me-2">{{ new Date(log.ts).toLocaleTimeString() }}</span>
        <span
            class="uppercase text-[10px] px-1.5 py-0.5 rounded me-2"
            :class="{
            'bg-cyan-500/20 text-cyan-200': log.level==='debug' || log.level==='info',
            'bg-amber-500/20 text-amber-200': log.level==='warn',
            'bg-rose-500/20 text-rose-200': log.level==='error'
          }"
        >{{ log.level }}</span>
        <span class="text-gray-200">{{ log.message }}</span>
      </div>
      <div v-if="!show.length" class="p-4 text-gray-500 text-sm">No logs</div>
    </div>
  </div>
</template>
