<script setup lang="ts">
import { ref, computed } from 'vue'
import { Eye, EyeOff, CheckCircle2, AlertTriangle, AlertOctagon } from 'lucide-vue-next'

export interface UiInputProps {
  modelValue: string
  type?: string
  label?: string
  placeholder?: string
  variant?: 'default' | 'outlined' | 'filled'
  icon?: any
  state?: 'success' | 'warning' | 'error' | 'none'
  message?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  passwordToggle?: boolean
}

const props = withDefaults(defineProps<UiInputProps>(), {
  type: 'text',
  variant: 'default',
  state: 'none',
  disabled: false,
  readonly: false,
  clearable: false,
  passwordToggle: false,
})

const emit = defineEmits(['update:modelValue', 'clear'])
const inputRef = ref<HTMLInputElement>()
const showPassword = ref(false)
const isFocused = ref(false)

const inputType = computed(() =>
    props.passwordToggle ? (showPassword.value ? 'text' : 'password') : props.type
)

const borderClass = computed(() => {
  switch (props.state) {
    case 'success':
      return 'border-emerald-400 focus:ring-emerald-500/40'
    case 'warning':
      return 'border-amber-400 focus:ring-amber-500/40'
    case 'error':
      return 'border-rose-400 focus:ring-rose-500/40'
    default:
      return 'border-white/10 focus:ring-fuchsia-500/40'
  }
})

const stateIcon = computed(() => {
  switch (props.state) {
    case 'success': return CheckCircle2
    case 'warning': return AlertTriangle
    case 'error': return AlertOctagon
    default: return null
  }
})

const clear = () => {
  emit('update:modelValue', '')
  emit('clear')
}

const shouldFloat = computed(() => isFocused.value || !!props.modelValue)
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <div
        class="relative flex items-center rounded-xl backdrop-blur-xl transition-all border focus-within:ring-2"
        :class="[
        borderClass,
        props.variant === 'default' && 'bg-white/5',
        props.variant === 'outlined' && 'bg-transparent',
        props.variant === 'filled' && 'bg-white/10',
        props.disabled && 'opacity-50 pointer-events-none',
      ]"
    >
      <!-- Left icon -->
      <component
          v-if="props.icon"
          :is="props.icon"
          class="w-4 h-4 ml-3 text-gray-400"
      />

      <!-- Input wrapper -->
      <div class="flex-1 relative">
        <label
            v-if="props.label"
            class="absolute left-3 select-none pointer-events-none transition-all duration-200"
            :class="[
    shouldFloat
      ? [
          '-top-2 text-xs font-medium px-2 rounded-md border backdrop-blur-md',
          'transition-all duration-300',
          isFocused
            ? 'bg-gray-900/85 border-white/20 shadow-[0_0_6px_rgba(0,0,0,0.4)]'
            : 'bg-black/50 border-white/10 shadow-[0_0_3px_rgba(0,0,0,0.3)]',
          props.state === 'success' && 'text-emerald-300',
          props.state === 'warning' && 'text-amber-300',
          props.state === 'error' && 'text-rose-300',
          props.state === 'none' && 'text-fuchsia-300',
        ]
      : 'top-3 text-gray-400 text-sm',
  ]"
            style="text-shadow: 0 1px 2px rgba(0,0,0,0.7);"
        >
          {{ props.label }}
        </label>


        <input
            ref="inputRef"
            v-bind="$attrs"
            :type="inputType"
            :disabled="props.disabled"
            :readonly="props.readonly"
            class="w-full bg-transparent outline-none px-3 pt-4 pb-2 text-gray-100 text-sm"
            :placeholder="shouldFloat ? props.placeholder : ''"
            :value="props.modelValue"
            @focus="isFocused = true"
            @blur="isFocused = false"
            @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
      </div>

      <!-- Password toggle -->
      <button
          v-if="props.passwordToggle"
          type="button"
          class="absolute right-4 text-gray-400 hover:text-gray-200 transition"
          @click="showPassword = !showPassword"
      >
        <component :is="showPassword ? EyeOff : Eye" class="w-4 h-4" />
      </button>

      <!-- Clear -->
      <button
          v-if="props.clearable && props.modelValue"
          type="button"
          class="absolute right-9 text-gray-400 hover:text-gray-200 transition"
          @click="clear"
      >
        ✕
      </button>

      <!-- State icon -->
      <component
          v-if="stateIcon"
          :is="stateIcon"
          class="w-4 h-4 mr-3"
          :class="{
          'text-emerald-400': props.state === 'success',
          'text-amber-400': props.state === 'warning',
          'text-rose-400': props.state === 'error',
        }"
      />
    </div>

    <!-- Message -->
    <p
        v-if="props.message"
        class="text-xs mt-0.5"
        :class="{
        'text-emerald-400': props.state === 'success',
        'text-amber-400': props.state === 'warning',
        'text-rose-400': props.state === 'error',
        'text-gray-400': props.state === 'none',
      }"
    >
      {{ props.message }}
    </p>
  </div>
</template>
