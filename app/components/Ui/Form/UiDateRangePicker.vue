<script setup lang="ts">
import { ref, computed } from 'vue'
export interface UiDateRange { start: Date | null; end: Date | null }
export interface UiDateRangePickerProps { modelValue: UiDateRange }
const props = defineProps<UiDateRangePickerProps>()
const emit = defineEmits<{ (e:'update:modelValue', v: UiDateRange): void }>()
const local = ref<UiDateRange>({ ...props.modelValue })
const fmt = (d: Date | null): string => d ? d.toLocaleDateString() : ''
const set = (key: 'start'|'end', v: string): void => {
  const date = v ? new Date(v) : null
  local.value = { ...local.value, [key]: date }
  emit('update:modelValue', local.value)
}
</script>

<template>
  <div class="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl px-3 py-2">
    <input type="date" class="bg-transparent outline-none text-gray-100" :value="local.start ? local.start.toISOString().slice(0,10) : ''" @input="set('start', ($event.target as HTMLInputElement).value)" />
    <span class="text-gray-500">—</span>
    <input type="date" class="bg-transparent outline-none text-gray-100" :value="local.end ? local.end.toISOString().slice(0,10) : ''" @input="set('end', ($event.target as HTMLInputElement).value)" />
  </div>
</template>
