<script setup lang="ts">
import { computed } from 'vue'
import { Check, X, Bell, AlertCircle } from 'lucide-vue-next'

export interface UiBadgeProps {
  label?: string
  color?: 'fuchsia' | 'indigo' | 'cyan' | 'emerald' | 'rose' | 'amber'
  variant?: 'solid' | 'soft' | 'outline' | 'glass'
  size?: 'sm' | 'md' | 'lg'
  icon?: any
  rounded?: boolean
  glow?: boolean
  dot?: boolean
}

const props = withDefaults(defineProps<UiBadgeProps>(), {
  label: '',
  color: 'fuchsia',
  variant: 'solid',
  size: 'md',
  rounded: true,
  glow: false,
  dot: false,
})

const colors: Record<string, { text: string; bg: string; border: string; gradient: string }> = {
  fuchsia: {
    text: 'text-fuchsia-300',
    bg: 'bg-fuchsia-500/15',
    border: 'border-fuchsia-400/30',
    gradient: 'from-fuchsia-500 to-indigo-500',
  },
  indigo: {
    text: 'text-indigo-300',
    bg: 'bg-indigo-500/15',
    border: 'border-indigo-400/30',
    gradient: 'from-indigo-500 to-cyan-500',
  },
  cyan: {
    text: 'text-cyan-300',
    bg: 'bg-cyan-500/15',
    border: 'border-cyan-400/30',
    gradient: 'from-cyan-400 to-fuchsia-500',
  },
  emerald: {
    text: 'text-emerald-300',
    bg: 'bg-emerald-500/15',
    border: 'border-emerald-400/30',
    gradient: 'from-emerald-400 to-cyan-400',
  },
  rose: {
    text: 'text-rose-300',
    bg: 'bg-rose-500/15',
    border: 'border-rose-400/30',
    gradient: 'from-rose-500 to-fuchsia-500',
  },
  amber: {
    text: 'text-amber-300',
    bg: 'bg-amber-500/15',
    border: 'border-amber-400/30',
    gradient: 'from-amber-400 to-orange-500',
  },
}

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-[10px] px-2 py-0.5 gap-1'
    case 'lg':
      return 'text-sm px-3 py-1.5 gap-1.5'
    default:
      return 'text-xs px-2.5 py-1 gap-1'
  }
})

const classes = computed(() => {
  const base = 'inline-flex items-center font-medium select-none transition-all backdrop-blur-md border'
  const c = colors[props.color]
  const rounded = props.rounded ? 'rounded-full' : 'rounded-md'
  const glow = props.glow ? `shadow-[0_0_10px_rgba(236,72,153,0.35)]` : ''
  switch (props.variant) {
    case 'solid':
      return `${base} ${rounded} ${sizeClasses.value} text-white bg-gradient-to-r ${c?.gradient} border-transparent ${glow}`
    case 'soft':
      return `${base} ${rounded} ${sizeClasses.value} ${c?.text} ${c?.bg} ${c?.border} ${glow}`
    case 'outline':
      return `${base} ${rounded} ${sizeClasses.value} ${c?.text} bg-transparent ${c?.border} ${glow}`
    case 'glass':
      return `${base} ${rounded} ${sizeClasses.value} ${c?.text} bg-white/5 border-white/10 ${glow}`
  }
})
</script>

<template>
  <span :class="classes">
    <!-- Dot mode -->
    <span
        v-if="dot"
        class="w-2.5 h-2.5 rounded-full"
        :class="[
        colors[color]?.bg,
        'inline-block',
        props.glow ? `shadow-[0_0_6px_rgba(236,72,153,0.5)]` : ''
      ]"
    ></span>

    <!-- Icon -->
    <component v-if="icon && !dot" :is="icon" class="w-3.5 h-3.5" />

    <!-- Label -->
    <span v-if="label">{{ label }}</span>
  </span>
</template>
