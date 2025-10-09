<script setup lang="ts">
export type FieldState = 'none' | 'success' | 'warning' | 'error'
export type FieldSize = 'sm' | 'md' | 'lg'
export type ParentTheme = 'dark' | 'light' | 'gradient'

export interface UiFormFieldProps {
  id?: string
  label?: string
  message?: string
  required?: boolean
  state?: FieldState
  size?: FieldSize
  parentTheme?: ParentTheme
  inline?: boolean // for checkbox/radio/switch if you want compact layout
}

const props = withDefaults(defineProps<UiFormFieldProps>(), {
  state: 'none',
  size: 'md',
  parentTheme: 'dark',
  inline: false,
})
</script>

<template>
  <div class="w-full" :class="props.inline ? 'flex items-center gap-3' : 'flex flex-col gap-1.5'">
    <!-- Label (external; inputs with floating labels can ignore) -->
    <label
        v-if="props.label"
        :for="props.id"
        class="text-sm font-medium"
        :class="[
        props.state === 'error' ? 'text-rose-400' :
        props.state === 'success' ? 'text-emerald-400' :
        'text-gray-300'
      ]"
    >
      {{ props.label }} <span v-if="props.required" class="text-rose-400">*</span>
    </label>

    <!-- Control -->
    <div>
      <slot />
    </div>

    <!-- Message -->
    <p
        v-if="props.message"
        class="text-xs"
        :class="{
        'text-rose-400': props.state === 'error',
        'text-amber-400': props.state === 'warning',
        'text-emerald-400': props.state === 'success',
        'text-gray-400': props.state === 'none',
      }"
    >
      {{ props.message }}
    </p>
  </div>
</template>
