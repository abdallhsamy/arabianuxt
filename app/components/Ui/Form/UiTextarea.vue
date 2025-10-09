<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue'
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
}

const props = withDefaults(defineProps<UiTextareaProps>(), {
  variant: 'default',
  state: 'none',
  parentTheme: 'dark',
  rows: 3,
  autoResize: true,
  disabled: false,
  readonly: false,
})

const emit = defineEmits(['update:modelValue'])
const textareaRef = ref<HTMLTextAreaElement>()
const isFocused = ref(false)

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

const shouldFloat = computed(() => isFocused.value || !!props.modelValue)

const resizeTextarea = () => {
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
    <!-- Wrapper -->
    <div
        class="relative rounded-xl backdrop-blur-xl transition-all border focus-within:ring-2"
        :class="[
        borderClass,
        props.variant === 'default' && 'bg-white/5',
        props.variant === 'outlined' && 'bg-transparent',
        props.variant === 'filled' && 'bg-white/10',
        props.disabled && 'opacity-50 pointer-events-none',
      ]"
    >
      <!-- Floating Label -->
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

      <!-- Textarea -->
      <textarea
          ref="textareaRef"
          :rows="props.rows"
          :disabled="props.disabled"
          :readonly="props.readonly"
          :placeholder="shouldFloat ? props.placeholder : ''"
          class="w-full bg-transparent resize-none outline-none px-3 pt-4 pb-3 text-gray-100 text-sm min-h-[3rem]"
          :value="props.modelValue"
          @focus="isFocused = true"
          @blur="isFocused = false"
          @input="
          emit('update:modelValue', ($event.target as HTMLTextAreaElement).value);
          resizeTextarea();
        "
      ></textarea>

      <!-- State Icon -->
      <component
          v-if="stateIcon"
          :is="stateIcon"
          class="absolute right-3 top-3 w-4 h-4"
          :class="{
          'text-emerald-400': props.state === 'success',
          'text-amber-400': props.state === 'warning',
          'text-rose-400': props.state === 'error',
        }"
      />
    </div>

    <!-- Message + Counter -->
    <div class="flex items-center justify-between text-xs mt-0.5">
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
