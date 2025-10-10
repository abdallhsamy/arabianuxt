<script setup lang="ts">
export interface UiContainerProps {
  max?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padded?: boolean
}

const props = withDefaults(defineProps<UiContainerProps>(), {
  max: 'xl',
  padded: true,
})

const maxClass = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  full: 'w-full',
}
</script>

<template>
  <div
      class="mx-auto bg-gradient-to-br from-gray-900 via-gray-950 to-black rounded-2xl border border-white/10"
      :class="[maxClass[max], padded ? 'p-6' : '']"
  >
    <slot />
  </div>
</template>
