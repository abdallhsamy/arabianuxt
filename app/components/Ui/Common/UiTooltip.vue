<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

export interface UiTooltipProps {
  text: string
  position?: 'top' | 'right' | 'bottom' | 'left' | 'start' | 'end'
  trigger?: 'hover' | 'click' | 'focus'
  delay?: number
  arrow?: boolean
  color?: 'fuchsia' | 'cyan' | 'emerald' | 'rose' | 'amber' | 'indigo'
  glow?: boolean
}

const props = withDefaults(defineProps<UiTooltipProps>(), {
  position: 'top',
  trigger: 'hover',
  delay: 150,
  arrow: true,
  color: 'fuchsia',
  glow: true,
})

const show = ref(false)
const timer = ref<number | undefined>()
const tooltipId = `tooltip-${Math.random().toString(36).slice(2)}`

const showTooltip = () => {
  clearTimeout(timer.value)
  timer.value = window.setTimeout(() => (show.value = true), props.delay)
}

const hideTooltip = () => {
  clearTimeout(timer.value)
  show.value = false
}

// Trigger logic
const onTrigger = {
  hover: { onMouseenter: showTooltip, onMouseleave: hideTooltip },
  click: { onClick: () => (show.value = !show.value) },
  focus: { onFocus: showTooltip, onBlur: hideTooltip },
}[props.trigger]

onUnmounted(() => clearTimeout(timer.value))

// Color gradients
const colors: Record<string, string> = {
  fuchsia: 'from-fuchsia-500 to-indigo-500',
  cyan: 'from-cyan-400 to-fuchsia-500',
  emerald: 'from-emerald-400 to-cyan-400',
  rose: 'from-rose-500 to-fuchsia-500',
  amber: 'from-amber-400 to-orange-500',
  indigo: 'from-indigo-500 to-cyan-400',
}
</script>

<template>
  <div class="relative inline-block" v-bind="onTrigger">
    <slot />

    <!-- Tooltip -->
    <transition name="fade">
      <div
          v-if="show"
          :id="tooltipId"
          role="tooltip"
          class="absolute z-50 px-3 py-1.5 text-xs font-medium text-white rounded-xl shadow-lg border border-white/10 backdrop-blur-xl whitespace-nowrap select-none"
          :class="[
          'bg-gradient-to-br',
          colors[color],
          glow ? 'shadow-[0_0_15px_rgba(236,72,153,0.35)]' : '',
          position === 'top' && 'bottom-full mb-2 left-1/2 -translate-x-1/2',
          position === 'bottom' && 'top-full mt-2 left-1/2 -translate-x-1/2',
          position === 'right' && 'left-full ml-2 top-1/2 -translate-y-1/2',
          position === 'left' && 'right-full mr-2 top-1/2 -translate-y-1/2',
          position === 'start' && 'ltr:right-full rtl:left-full me-2 top-1/2 -translate-y-1/2',
          position === 'end' && 'ltr:left-full rtl:right-full ms-2 top-1/2 -translate-y-1/2',
        ]"
      >
        {{ text }}

        <!-- Arrow -->
        <div
            v-if="arrow"
            class="absolute w-2 h-2 rotate-45 bg-gradient-to-br"
            :class="[
            colors[color],
            position === 'top' && 'bottom-[-4px] left-1/2 -translate-x-1/2',
            position === 'bottom' && 'top-[-4px] left-1/2 -translate-x-1/2',
            position === 'right' && 'left-[-4px] top-1/2 -translate-y-1/2',
            position === 'left' && 'right-[-4px] top-1/2 -translate-y-1/2',
            position === 'start' && 'ltr:right-[-4px] rtl:left-[-4px] top-1/2 -translate-y-1/2',
            position === 'end' && 'ltr:left-[-4px] rtl:right-[-4px] top-1/2 -translate-y-1/2',
          ]"
        />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-3px);
}
</style>
