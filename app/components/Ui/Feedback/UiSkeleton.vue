<script setup lang="ts">
import { computed } from 'vue'

export type SkeletonVariant =
    | 'text'
    | 'circle'
    | 'rect'
    | 'avatar'
    | 'card'
    | 'button'

export type SkeletonAnimation = 'shimmer' | 'pulse' | false
export type SkeletonIntensity = 'subtle' | 'medium' | 'strong'

export interface UiSkeletonProps {
  variant?: SkeletonVariant
  width?: string | number
  height?: string | number
  radius?: string | number
  animation?: SkeletonAnimation
  intensity?: SkeletonIntensity
  speed?: number // in seconds, affects both shimmer & pulse
  lines?: number
  dark?: boolean
}

const props = withDefaults(defineProps<UiSkeletonProps>(), {
  variant: 'text',
  width: '100%',
  height: undefined,
  radius: '0.5rem',
  animation: 'shimmer',
  intensity: 'medium',
  speed: 1.6,
  lines: 1,
  dark: true,
})

/* ---------- variant defaults ---------- */
const variantDefaults = computed(() => {
  switch (props.variant) {
    case 'circle':
      return { height: props.width ?? '3rem' }
    case 'avatar':
      return { height: props.width ?? '3rem', radius: '9999px' }
    case 'button':
      return { height: '2.5rem', radius: '0.375rem' }
    case 'card':
      return { height: '10rem', radius: '0.75rem' }
    case 'rect':
      return { height: props.height ?? '4rem' }
    default:
      return { height: '1rem' }
  }
})

/* ---------- style ---------- */
const style = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  height:
      typeof props.height === 'number'
          ? `${props.height}px`
          : props.height || variantDefaults.value.height,
  borderRadius: typeof props.radius === 'number' ? `${props.radius}px` : props.radius,
  '--skeleton-speed': `${props.speed}s`,
  '--skeleton-intensity': intensityAlpha.value,
}))

/* ---------- intensity mapping ---------- */
const intensityAlpha = computed(() => {
  switch (props.intensity) {
    case 'subtle':
      return 0.05
    case 'medium':
      return 0.1
    case 'strong':
      return 0.2
    default:
      return 0.1
  }
})

/* ---------- classes ---------- */
const classes = computed(() => {
  const base = props.dark
      ? 'bg-white/10 text-gray-100'
      : 'bg-gray-200 text-gray-800'

  const anim =
      props.animation === 'shimmer'
          ? 'animate-skeleton-shimmer'
          : props.animation === 'pulse'
              ? 'animate-skeleton-pulse'
              : ''

  return [
    'relative overflow-hidden select-none',
    base,
    anim,
  ]
})
</script>

<template>
  <div v-if="props.variant === 'text' && props.lines > 1" class="space-y-2">
    <div
        v-for="n in props.lines"
        :key="n"
        :class="classes"
        :style="[style, { width: n === props.lines ? '80%' : style.width }]"
    ></div>
  </div>

  <div v-else :class="classes" :style="style"></div>
</template>

<style scoped>
/* ============ SHIMMER ANIMATION ============ */
@keyframes skeleton-shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.animate-skeleton-shimmer {
  background: linear-gradient(
      90deg,
      rgba(255, 255, 255, var(--skeleton-intensity, 0.1)) 25%,
      rgba(255, 255, 255, calc(var(--skeleton-intensity, 0.1) * 1.5)) 37%,
      rgba(255, 255, 255, var(--skeleton-intensity, 0.1)) 63%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer var(--skeleton-speed, 1.6s) infinite linear;
}

/* ============ PULSE ANIMATION ============ */
@keyframes skeleton-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

.animate-skeleton-pulse {
  animation: skeleton-pulse var(--skeleton-speed, 1.6s) ease-in-out infinite;
}
</style>
