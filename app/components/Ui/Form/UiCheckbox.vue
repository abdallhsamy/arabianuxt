<script setup lang="ts">
import { computed } from 'vue'

export type FieldSize = 'sm' | 'md' | 'lg'

export interface UiCheckboxProps {
  modelValue: boolean
  id?: string
  label?: string
  disabled?: boolean
  indeterminate?: boolean
  size?: FieldSize
}

const props = withDefaults(defineProps<UiCheckboxProps>(), {
  size: 'md',
})
const emit = defineEmits(['update:modelValue', 'change'])

const s = computed(() => ({
  sm: { box: 'w-4 h-4', font: 'text-sm' },
  md: { box: 'w-5 h-5', font: 'text-sm' },
  lg: { box: 'w-6 h-6', font: 'text-base' },
}[props.size]))

const toggle = () => {
  if (props.disabled) return
  emit('update:modelValue', !props.modelValue)
  emit('change', !props.modelValue)
}
</script>

<template>
  <button
      type="button"
      :id="props.id"
      role="checkbox"
      :aria-checked="props.modelValue"
      :aria-disabled="props.disabled"
      @click="toggle"
      class="inline-flex items-center gap-2 select-none"
      :class="props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'"
  >
    <span
        class="rounded-md border border-white/15 backdrop-blur-xl bg-white/5 flex items-center justify-center transition-all focus-visible:ring-2 ring-fuchsia-500/40"
        :class="[s.box, props.modelValue ? 'bg-gradient-to-br from-fuchsia-500/80 to-cyan-500/70 border-transparent shadow-[0_0_10px_rgba(236,72,153,0.3)]' : '']"
    >
      <svg v-if="props.indeterminate && !props.modelValue" viewBox="0 0 20 20" class="w-3.5 h-3.5 text-white"><rect x="4" y="9" width="12" height="2" fill="currentColor"/></svg>
      <svg v-else-if="props.modelValue" viewBox="0 0 20 20" class="w-3.5 h-3.5 text-white"><path fill="currentColor" d="M8.143 13.314 4.83 10l1.414-1.414 1.9 1.9 5.612-5.612L15.17 6.29z"/></svg>
    </span>
    <span :class="['text-gray-200', s.font]" v-if="props.label">{{ props.label }}</span>
  </button>
</template>
