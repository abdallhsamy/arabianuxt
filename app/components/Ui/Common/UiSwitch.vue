<script setup lang="ts">
import { computed } from 'vue'
import { Check, X } from 'lucide-vue-next'

export interface UiSwitchProps {
  modelValue: boolean
  label?: string
  description?: string
  size?: 'sm' | 'md' | 'lg'
  color?: 'fuchsia' | 'cyan' | 'emerald' | 'rose' | 'amber' | 'indigo'
  disabled?: boolean
  icon?: boolean
  outlined?: boolean
}

const props = withDefaults(defineProps<UiSwitchProps>(), {
  modelValue: false,
  size: 'md',
  color: 'fuchsia',
  icon: false,
  disabled: false,
  outlined: false,
})

const emit = defineEmits(['update:modelValue', 'change'])

const toggle = (): void => {
  if (props.disabled) return
  emit('update:modelValue', !props.modelValue)
  emit('change', !props.modelValue)
}

const colors: Record<string, string> = {
  fuchsia: 'from-fuchsia-500 to-indigo-500',
  cyan: 'from-cyan-400 to-indigo-500',
  emerald: 'from-emerald-400 to-cyan-400',
  rose: 'from-rose-500 to-fuchsia-500',
  amber: 'from-amber-400 to-orange-500',
  indigo: 'from-indigo-500 to-fuchsia-500',
}

const sizes: Record<string, { w: string; h: string; knob: string }> = {
  sm: { w: 'w-9', h: 'h-5', knob: 'w-4 h-4' },
  md: { w: 'w-11', h: 'h-6', knob: 'w-5 h-5' },
  lg: { w: 'w-14', h: 'h-8', knob: 'w-7 h-7' },
}

const colorClass = computed(() => colors[props.color])
const sizeClass = computed(() => sizes[props.size])
</script>

<template>
  <div
      class="flex items-center gap-3 select-none"
      :class="{ 'opacity-50 cursor-not-allowed': disabled }"
  >
    <!-- Switch container -->
    <button
        role="switch"
        :aria-checked="modelValue"
        tabindex="0"
        @click="toggle"
        @keydown.space.prevent="toggle"
        @keydown.enter.prevent="toggle"
        :disabled="disabled"
        class="relative inline-flex transition-all duration-300 rounded-full border border-white/10 backdrop-blur-xl"
        :class="[
        sizeClass.w,
        sizeClass.h,
        outlined ? 'bg-transparent' : modelValue ? `bg-gradient-to-r ${colorClass}` : 'bg-white/10',
        'focus-visible:ring-2 focus-visible:ring-fuchsia-500/40'
      ]"
    >
      <!-- Knob -->
      <div
          class="absolute top-0.5 left-0.5 flex items-center justify-center bg-white/90 text-gray-700 rounded-full transition-all duration-300 shadow-lg"
          :class="[
          sizeClass.knob,
          modelValue ? `translate-x-[calc(100%-0.25rem)]` : 'translate-x-0',
        ]"
      >
        <component
            v-if="icon"
            :is="modelValue ? Check : X"
            class="w-3.5 h-3.5"
        />
      </div>
    </button>

    <!-- Labels -->
    <div v-if="label" class="flex flex-col">
      <span class="text-gray-200 text-sm font-medium">{{ label }}</span>
      <span v-if="description" class="text-gray-400 text-xs">{{ description }}</span>
    </div>
  </div>
</template>
