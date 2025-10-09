<script setup lang="ts">
import { computed } from 'vue'
import { Loader2 } from 'lucide-vue-next'

export interface UiButtonProps {
  label?: string
  icon?: any
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'glass'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  full?: boolean
  iconPosition?: 'left' | 'right'
}

const props = withDefaults(defineProps<UiButtonProps>(), {
  variant: 'primary',
  size: 'md',
  iconPosition: 'left',
  loading: false,
  disabled: false,
  full: false
})

const base = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all select-none active:scale-[0.98]'

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 text-white hover:brightness-110 shadow-[0_0_15px_rgba(236,72,153,0.3)]'
    case 'secondary':
      return 'bg-white/10 text-white hover:bg-white/15 border border-white/10'
    case 'danger':
      return 'bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white hover:brightness-110'
    case 'success':
      return 'bg-gradient-to-r from-emerald-500 to-cyan-400 text-white hover:brightness-110'
    case 'outline':
      return 'border border-white/20 text-gray-200 hover:bg-white/10'
    case 'glass':
      return 'backdrop-blur-xl bg-white/5 border border-white/10 text-white hover:bg-white/10'
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-xs px-3 py-1.5 gap-1.5'
    case 'lg':
      return 'text-base px-6 py-3 gap-2.5'
    default:
      return 'text-sm px-4 py-2 gap-2'
  }
})

const classes = computed(() =>
    [
      base,
      variantClasses.value,
      sizeClasses.value,
      props.full ? 'w-full' : '',
      props.disabled ? 'opacity-50 cursor-not-allowed' : ''
    ].join(' ')
)
</script>

<template>
  <button :class="classes" :disabled="props.disabled || props.loading">
    <!-- Icon left -->
    <component
        v-if="props.icon && props.iconPosition === 'left' && !props.loading"
        :is="props.icon"
        class="w-4 h-4"
    />

    <!-- Loader -->
    <Loader2 v-if="props.loading" class="w-4 h-4 animate-spin" />

    <!-- Label -->
    <span v-if="props.label">{{ props.label }}</span>

    <!-- Icon right -->
    <component
        v-if="props.icon && props.iconPosition === 'right' && !props.loading"
        :is="props.icon"
        class="w-4 h-4"
    />
  </button>
</template>
