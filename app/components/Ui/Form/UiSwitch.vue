<script setup lang="ts">
import { computed } from 'vue'

export type FieldSize = 'sm' | 'md' | 'lg'

export interface UiSwitchProps {
  modelValue: boolean
  id?: string
  label?: string
  disabled?: boolean
  size?: FieldSize
}

const props = withDefaults(defineProps<UiSwitchProps>(), {
  size: 'md',
})
const emit = defineEmits(['update:modelValue', 'change'])

const s = computed(() => ({
  sm: { track: 'w-9 h-5', knob: 'w-4 h-4', offset: 'translate-x-4' },
  md: { track: 'w-11 h-6', knob: 'w-5 h-5', offset: 'translate-x-5' },
  lg: { track: 'w-14 h-7', knob: 'w-6 h-6', offset: 'translate-x-7' },
}[props.size]))

const toggle = () => {
  if (props.disabled) return
  const val = !props.modelValue
  emit('update:modelValue', val)
  emit('change', val)
}
</script>

<template>
  <div class="inline-flex items-center gap-3 select-none" :class="props.disabled ? 'opacity-50' : ''">
    <button
        type="button"
        :id="props.id"
        role="switch"
        :aria-checked="props.modelValue"
        :aria-disabled="props.disabled"
        @click="toggle"
        class="relative rounded-full border border-white/15 backdrop-blur-xl transition-all focus-visible:ring-2 ring-fuchsia-500/40"
        :class="[ s.track, props.modelValue ? 'bg-gradient-to-r from-fuchsia-500/60 to-cyan-500/60' : 'bg-white/10' ]"
    >
      <span
          class="absolute top-1/2 -translate-y-1/2 left-1 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.35)] transition-transform"
          :class="[ s.knob, props.modelValue ? s.offset : '' ]"
      />
    </button>
    <label v-if="props.label" :for="props.id" class="text-gray-200 text-sm">{{ props.label }}</label>
  </div>
</template>
