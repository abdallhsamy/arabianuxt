<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { CheckCircle2, AlertTriangle, AlertOctagon } from 'lucide-vue-next'

export interface UiTextareaProps {
  modelValue: string
  label?: string
  placeholder?: string
  variant?: 'default' | 'outlined' | 'filled'
  state?: 'success' | 'warning' | 'error' | 'none'
  message?: string
  maxLength?: number
  autoResize?: boolean
  rows?: number
  disabled?: boolean
  readonly?: boolean
  parentTheme?: 'dark' | 'light' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
}

const props = withDefaults(defineProps<UiTextareaProps>(), {
  variant: 'default',
  state: 'none',
  parentTheme: 'dark',
  rows: 3,
  autoResize: true,
  disabled: false,
  readonly: false,
  size: 'md',
  resize: 'vertical', // ✅ user can resize vertically by default
})

const emit = defineEmits(['update:modelValue'])
const textareaRef = ref<HTMLTextAreaElement>()
const isFocused = ref(false)

// --- Shared sizing system ---
const s = computed(() => ({
  sm: { font: 'text-sm', pad: 'py-2' },
  md: { font: 'text-sm', pad: 'py-2.5' },
  lg: { font: 'text-base', pad: 'py-3' },
}[props.size]))

// --- Border classes per validation state ---
const borderClass = computed(() => {
  switch (props.state) {
    case 'success': return 'border-emerald-400 focus:ring-emerald-500/40'
    case 'warning': return 'border-amber-400 focus:ring-amber-500/40'
    case 'error': return 'border-rose-400 focus:ring-rose-500/40'
    default: return 'border-white/10 focus:ring-fuchsia-500/40'
  }
})

// --- Icons per validation state (type-safe) ---
const stateIcon = computed(() => {
  switch (props.state) {
    case 'success': return CheckCircle2
    case 'warning': return AlertTriangle
    case 'error': return AlertOctagon
    default: return null
  }
})

// --- Floating label ---
const shouldFloat = computed(() => isFocused.value || !!props.modelValue)

// --- Auto-resize logic (optional) ---
const resizeTextarea = (): void => {
  if (props.autoResize && textareaRef.value) {
    textareaRef.value.style.height = 'auto'
    textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px'
  }
}
watch(() => props.modelValue, resizeTextarea)
onMounted(() => nextTick(resizeTextarea))
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <div
        class="relative rounded-xl backdrop-blur-xl border transition-all focus-within:ring-2"
        :class="[
        borderClass,
        props.variant === 'default' && 'bg-white/5',
        props.variant === 'outlined' && 'bg-transparent',
        props.variant === 'filled' && 'bg-white/10',
        props.disabled && 'opacity-50 pointer-events-none',
      ]"
    >
      <!-- Floating label -->
      <label
          v-if="props.label"
          class="absolute ltr:left-3 rtl:right-3 transition-all duration-300 pointer-events-none select-none"
          :class="[
          shouldFloat
            ? [
                '-top-2 text-xs font-medium px-2 rounded-md border backdrop-blur-md',
                props.parentTheme === 'gradient'
                  ? 'bg-gradient-to-r from-fuchsia-500/40 to-cyan-500/40 border-transparent text-white'
                  : props.parentTheme === 'light'
                  ? 'bg-black/70 border-white/20 text-white'
                  : 'bg-gray-900/85 border-white/15 text-fuchsia-300',
              ]
            : ['top-3 text-gray-400', s.font],
        ]"
      >
        {{ props.label }}
      </label>

      <!-- Textarea -->
      <textarea
          ref="textareaRef"
          :rows="props.rows"
          :disabled="props.disabled"
          :readonly="props.readonly"
          :placeholder="shouldFloat ? props.placeholder : ''"
          :style="{ resize: props.resize }"
          class="w-full bg-transparent outline-none px-3 pt-4 text-gray-100 min-h-[3rem]"
          :class="[s.font, s.pad]"
          :value="props.modelValue"
          @focus="isFocused = true"
          @blur="isFocused = false"
          @input="
          emit('update:modelValue', ($event.target as HTMLTextAreaElement).value);
          resizeTextarea();
        "
      />

      <!-- State Icon -->
      <component
          v-if="stateIcon"
          :is="stateIcon"
          class="absolute ltr:right-3 rtl:left-3 top-3 w-4 h-4"
          :class="{
          'text-emerald-400': props.state === 'success',
          'text-amber-400': props.state === 'warning',
          'text-rose-400': props.state === 'error',
        }"
      />
    </div>

    <!-- Message & Counter -->
    <div class="flex justify-between text-xs mt-0.5">
      <p
          v-if="props.message"
          :class="{
          'text-emerald-400': props.state === 'success',
          'text-amber-400': props.state === 'warning',
          'text-rose-400': props.state === 'error',
          'text-gray-400': props.state === 'none',
        }"
      >
        {{ props.message }}
      </p>

      <p
          v-if="props.maxLength"
          class="text-gray-500"
          :class="{ 'text-rose-400': props.modelValue?.length > props.maxLength }"
      >
        {{ props.modelValue?.length || 0 }} / {{ props.maxLength }}
      </p>
    </div>
  </div>
</template>
