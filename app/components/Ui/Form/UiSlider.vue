<script setup lang="ts">
import { ref, computed } from 'vue'

export interface UiSliderProps {
  modelValue: number
  min?: number
  max?: number
  step?: number
  showValue?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<UiSliderProps>(), {
  min: 0, max: 100, step: 1, showValue: true, disabled: false,
})
const emit = defineEmits(['update:modelValue', 'change'])

const pct = computed(() => Math.max(0, Math.min(100, ((props.modelValue - props.min) / (props.max - props.min)) * 100)))

const onInput = (e: Event) => {
  const v = Number((e.target as HTMLInputElement).value)
  emit('update:modelValue', v)
}
const onChange = (e: Event) => emit('change', Number((e.target as HTMLInputElement).value))
</script>

<template>
  <div class="w-full">
    <div class="relative h-6">
      <!-- Track bg -->
      <div class="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 rounded-full bg-white/10 overflow-hidden">
        <div class="h-full bg-gradient-to-r from-fuchsia-500/70 to-cyan-500/70" :style="{ width: pct + '%' }"></div>
      </div>

      <!-- Native input for accessibility -->
      <input
          type="range"
          class="absolute inset-0 w-full opacity-0 cursor-pointer"
          :min="props.min" :max="props.max" :step="props.step" :value="modelValue"
          :disabled="props.disabled"
          @input="onInput" @change="onChange"
      />

      <!-- Knob -->
      <div
          class="absolute top-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.35)] w-4 h-4 -ms-2"
          :style="{ left: pct + '%' }"
      />
      <!-- Value bubble -->
      <div v-if="props.showValue" class="absolute -top-8 -translate-x-1/2 text-xs text-gray-100 px-2 py-1 rounded-md bg-black/70 border border-white/10"
           :style="{ left: pct + '%' }">
        {{ modelValue }}
      </div>
    </div>
  </div>
</template>
