<script setup lang="ts">
import { computed } from 'vue'
import { Info, Star } from 'lucide-vue-next'

export interface UiCardProps {
  title?: string
  icon?: any
  gradient?: boolean
  outlined?: boolean
  hoverable?: boolean
  compact?: boolean
  elevated?: boolean
  footer?: boolean
  color?: 'fuchsia' | 'indigo' | 'cyan' | 'rose' | 'emerald' | 'amber'
}

const props = withDefaults(defineProps<UiCardProps>(), {
  color: 'fuchsia',
  gradient: false,
  outlined: false,
  hoverable: false,
  compact: false,
  elevated: false,
  footer: false,
})

const colors: Record<string, string> = {
  fuchsia: 'from-fuchsia-500 via-indigo-500 to-cyan-400',
  indigo: 'from-indigo-500 via-fuchsia-500 to-cyan-400',
  cyan: 'from-cyan-400 via-indigo-500 to-fuchsia-500',
  rose: 'from-rose-500 to-fuchsia-500',
  emerald: 'from-emerald-400 to-cyan-400',
  amber: 'from-amber-400 to-orange-500',
}

const colorClass = computed(() => colors[props.color])
</script>

<template>
  <div
      class="relative overflow-hidden rounded-2xl transition-all duration-300 border backdrop-blur-xl"
      :class="[
      outlined ? 'border-white/15 bg-transparent' : 'border-white/10 bg-white/5',
      gradient ? `bg-gradient-to-br ${colorClass} text-white` : 'text-gray-200',
      hoverable ? 'hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(236,72,153,0.25)]' : '',
      elevated ? 'shadow-[0_0_15px_rgba(255,255,255,0.08)]' : '',
      compact ? 'p-4' : 'p-6'
    ]"
  >
    <!-- Header -->
    <div v-if="title || icon" class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <component v-if="icon" :is="icon" class="w-5 h-5 text-fuchsia-400" />
        <h2 class="text-lg font-semibold">{{ title }}</h2>
      </div>
      <slot name="header-right" />
    </div>

    <!-- Body -->
    <div class="text-sm leading-relaxed">
      <slot />
    </div>

    <!-- Footer -->
    <div
        v-if="footer"
        class="mt-4 border-t border-white/10 pt-4 flex justify-end items-center gap-3"
    >
      <slot name="footer">
        <button
            class="px-4 py-2 rounded-lg bg-white/10 text-white text-sm hover:bg-white/20"
        >
          OK
        </button>
      </slot>
    </div>
  </div>
</template>
