<script setup lang="ts">
import { ref, computed } from 'vue'
import { Eye, EyeOff, CheckCircle2, AlertTriangle, AlertOctagon } from 'lucide-vue-next'

export interface UiInputProps {
  modelValue: string
  type?: string
  label?: string
  placeholder?: string
  variant?: 'default' | 'outlined' | 'filled'
  state?: 'success' | 'warning' | 'error' | 'none'
  message?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  passwordToggle?: boolean
  parentTheme?: 'dark' | 'light' | 'gradient'
}

const props = withDefaults(defineProps<UiInputProps>(), {
  type: 'text',
  variant: 'default',
  state: 'none',
  parentTheme: 'dark',
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
    case 'success': return 'border-emerald-400 focus:ring-emerald-500/40'
    case 'warning': return 'border-amber-400 focus:ring-amber-500/40'
    case 'error': return 'border-rose-400 focus:ring-rose-500/40'
    default: return 'border-white/10 focus:ring-fuchsia-500/40'
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
      <!-- Prefix slot -->
      <div v-if="$slots.prefix" class="flex items-center pl-3 pr-2 text-gray-400">
        <slot name="prefix" />
      </div>

      <!-- Input wrapper -->
      <div class="relative flex-1">
        <!-- Floating label -->
        <label
            v-if="props.label"
            class="absolute left-3 select-none pointer-events-none transition-all duration-300"
            :class="[
            shouldFloat
              ? [
                  '-top-2 text-xs font-medium px-2 rounded-md border backdrop-blur-md',
                  props.parentTheme === 'gradient'
                    ? 'bg-gradient-to-r from-fuchsia-500/40 to-cyan-500/40 border-transparent text-white'
                    : props.parentTheme === 'light'
                    ? 'bg-black/70 border-white/20 text-white'
                    : 'bg-gray-900/85 border-white/15 text-fuchsia-300',
                  isFocused
                    ? 'shadow-[0_0_8px_rgba(255,255,255,0.15)]'
                    : 'shadow-[0_0_4px_rgba(0,0,0,0.3)]',
                  props.state === 'success' && 'text-emerald-300',
                  props.state === 'warning' && 'text-amber-300',
                  props.state === 'error' && 'text-rose-300',
                ]
              : 'top-3 text-gray-400 text-sm',
          ]"
            style="text-shadow: 0 1px 3px rgba(0,0,0,0.8);"
        >
          {{ props.label }}
        </label>

        <!-- Input field -->
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
          class="text-gray-400 hover:text-gray-200 transition px-2"
          @click="showPassword = !showPassword"
      >
        <component :is="showPassword ? EyeOff : Eye" class="w-4 h-4" />
      </button>

      <!-- Suffix slot -->
      <div v-if="$slots.suffix" class="flex items-center pr-3 pl-2 text-gray-400">
        <slot name="suffix" />
      </div>

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

    <!-- Helper message -->
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
