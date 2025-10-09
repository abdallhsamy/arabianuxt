<script setup lang="ts">
import { ref, computed } from 'vue'
import { Loader2 } from 'lucide-vue-next'

export interface UiButtonProps {
  label?: string
  icon?: any
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'glass'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  full?: boolean
  iconOnly?: boolean
  toggleable?: boolean
  modelValue?: boolean
  iconPosition?: 'left' | 'right'
  ariaLabel?: string
}

const props = withDefaults(defineProps<UiButtonProps>(), {
  variant: 'primary',
  size: 'md',
  iconPosition: 'left',
  loading: false,
  disabled: false,
  full: false,
  iconOnly: false,
  toggleable: false,
  modelValue: false
})

const emit = defineEmits(['update:modelValue', 'click'])
const isActive = ref(props.modelValue)

const toggle = () => {
  if (props.toggleable) {
    isActive.value = !isActive.value
    emit('update:modelValue', isActive.value)
  }
  emit('click')
}

const base = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all select-none outline-none focus-visible:ring-2 ring-offset-2 ring-fuchsia-500/50 active:scale-[0.98]'

const variantClasses = computed(() => {
  if (props.toggleable && isActive.value) {
    return 'bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-cyan-400 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)]'
  }
  switch (props.variant) {
    case 'primary':
      return 'bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 text-white hover:brightness-110'
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
      return props.iconOnly ? 'w-8 h-8' : 'text-xs px-3 py-1.5 gap-1.5'
    case 'lg':
      return props.iconOnly ? 'w-12 h-12' : 'text-base px-6 py-3 gap-2.5'
    default:
      return props.iconOnly ? 'w-10 h-10' : 'text-sm px-4 py-2 gap-2'
  }
})

const classes = computed(() =>
    [
      base,
      variantClasses.value,
      sizeClasses.value,
      props.full ? 'w-full' : '',
      props.disabled ? 'opacity-50 cursor-not-allowed' : '',
    ].join(' ')
)
</script>

<template>
  <button
      :class="classes"
      :disabled="props.disabled || props.loading"
      :aria-label="props.ariaLabel || props.label"
      role="button"
      @click="toggle"
  >
    <!-- Loader -->
    <Loader2 v-if="props.loading" class="w-4 h-4 animate-spin" />

    <!-- Icon-only -->
    <component
        v-else-if="props.iconOnly && props.icon"
        :is="props.icon"
        class="w-5 h-5"
    />

    <!-- Icon + Label -->
    <template v-else>
      <component
          v-if="props.icon && props.iconPosition === 'left'"
          :is="props.icon"
          class="w-4 h-4"
      />
      <span v-if="props.label">{{ props.label }}</span>
      <component
          v-if="props.icon && props.iconPosition === 'right'"
          :is="props.icon"
          class="w-4 h-4"
      />
    </template>
  </button>
</template>
