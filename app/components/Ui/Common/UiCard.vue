<script setup lang="ts">
import { computed } from 'vue'

export interface UiCardProps {
  title?: string
  subtitle?: string
  variant?: 'glass' | 'solid' | 'gradient' | 'outlined'
  hoverable?: boolean
  elevated?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  color?: 'fuchsia' | 'cyan' | 'emerald' | 'rose' | 'indigo' | 'amber'
  rounded?: boolean
  footer?: boolean
}

const props = withDefaults(defineProps<UiCardProps>(), {
  variant: 'glass',
  hoverable: true,
  elevated: true,
  padding: 'md',
  color: 'fuchsia',
  rounded: true,
  footer: false,
})

const paddingMap = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-8',
}

const colors: Record<string, string> = {
  fuchsia: 'from-fuchsia-500 to-indigo-500',
  cyan: 'from-cyan-400 to-fuchsia-500',
  emerald: 'from-emerald-400 to-cyan-400',
  rose: 'from-rose-500 to-fuchsia-500',
  indigo: 'from-indigo-500 to-cyan-400',
  amber: 'from-amber-400 to-orange-500',
}

const colorClass = computed(() => colors[props.color])
</script>

<template>
  <div
      class="relative flex flex-col transition-all duration-300 border border-white/10 backdrop-blur-xl overflow-hidden"
      :class="[
      props.rounded ? 'rounded-2xl' : 'rounded-lg',
      props.variant === 'glass' && 'bg-white/5',
      props.variant === 'solid' && 'bg-gray-900',
      props.variant === 'gradient' && `bg-gradient-to-br ${colorClass}`,
      props.variant === 'outlined' && 'bg-transparent border-white/20',
      props.hoverable ? 'hover:scale-[1.02]' : '',
      props.elevated ? 'shadow-[0_0_20px_rgba(255,255,255,0.05)]' : '',
    ]"
  >
    <!-- HEADER -->
    <div
        v-if="title || subtitle || $slots.header"
        class="flex items-center justify-between px-5 py-4 border-b border-white/10"
    >
      <div>
        <h3 v-if="title" class="text-base font-semibold text-gray-100">{{ title }}</h3>
        <p v-if="subtitle" class="text-xs text-gray-400">{{ subtitle }}</p>
      </div>
      <slot name="header" />
    </div>

    <!-- BODY -->
    <div
        class="flex-1 text-gray-200"
        :class="paddingMap[props.padding]"
    >
      <slot />
    </div>

    <!-- FOOTER -->
    <div
        v-if="props.footer || $slots.footer"
        class="px-5 py-4 border-t border-white/10 text-sm text-gray-300 flex justify-end gap-3"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
