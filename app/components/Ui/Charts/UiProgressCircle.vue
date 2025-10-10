<script setup lang="ts">
import { computed } from 'vue'
export interface UiProgressCircleProps { value: number; size?: number; stroke?: number }
const props = withDefaults(defineProps<UiProgressCircleProps>(), { size: 120, stroke: 10 })
const r = computed(() => (props.size - props.stroke) / 2)
const C = computed(() => 2 * Math.PI * r.value)
const dash = computed(() => `${(props.value / 100) * C.value} ${C.value}`)
</script>

<template>
  <svg :width="props.size" :height="props.size" class="block">
    <circle :cx="props.size/2" :cy="props.size/2" :r="r" :stroke-width="props.stroke" class="fill-none stroke-white/10"/>
    <circle :cx="props.size/2" :cy="props.size/2" :r="r" :stroke-width="props.stroke" class="fill-none"
            stroke-linecap="round" :stroke-dasharray="dash"
            style="stroke: url(#grad)"/>
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="rgb(217 70 239 / .8)"/>
        <stop offset="100%" stop-color="rgb(34 211 238 / .8)"/>
      </linearGradient>
    </defs>
  </svg>
</template>
