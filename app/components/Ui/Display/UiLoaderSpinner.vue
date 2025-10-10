<script setup lang="ts">
export interface UiLoaderSpinnerProps {
  size?: number
  color?: string
}

const props = withDefaults(defineProps<UiLoaderSpinnerProps>(), {
  size: 28,
  color: '#A855F7',
})
</script>

<template>
  <svg
      :width="props.size"
      :height="props.size"
      viewBox="0 0 50 50"
      class="animate-spin"
      xmlns="http://www.w3.org/2000/svg"
  >
    <circle
        class="opacity-25"
        cx="25"
        cy="25"
        r="20"
        stroke="currentColor"
        stroke-width="5"
        fill="none"
    />
    <circle
        class="opacity-100"
        cx="25"
        cy="25"
        r="20"
        :stroke="props.color"
        stroke-width="5"
        stroke-linecap="round"
        stroke-dasharray="80"
        stroke-dashoffset="60"
        fill="none"
    />
  </svg>
</template>
