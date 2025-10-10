<script setup lang="ts">
export interface UiBadgeProps {
  label: string
  color?: 'gray' | 'fuchsia' | 'cyan' | 'emerald' | 'amber' | 'rose'
  variant?: 'solid' | 'outline' | 'soft'
  size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<UiBadgeProps>(), {
  color: 'fuchsia',
  variant: 'soft',
  size: 'md',
})

const colorMap = {
  gray: 'from-gray-600 to-gray-500 text-gray-100 border-gray-600',
  fuchsia: 'from-fuchsia-600 to-pink-500 text-fuchsia-100 border-fuchsia-600',
  cyan: 'from-cyan-600 to-teal-500 text-cyan-100 border-cyan-600',
  emerald: 'from-emerald-600 to-green-500 text-emerald-100 border-emerald-600',
  amber: 'from-amber-600 to-orange-500 text-amber-100 border-amber-600',
  rose: 'from-rose-600 to-pink-500 text-rose-100 border-rose-600',
}
</script>

<template>
  <span
      class="inline-flex items-center justify-center rounded-full text-xs font-medium select-none"
      :class="[
      props.size === 'sm' ? 'px-2 py-0.5' : 'px-3 py-1',
      props.variant === 'solid'
        ? `bg-gradient-to-r ${colorMap[props.color]}`
        : props.variant === 'outline'
          ? `border ${colorMap[props.color].split(' ')[2]}`
          : `bg-${props.color}-500/20 text-${props.color}-300`,
    ]"
  >
    {{ props.label }}
  </span>
</template>
