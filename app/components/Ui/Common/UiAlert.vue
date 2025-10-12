<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { X, Info, CheckCircle2, AlertTriangle, AlertOctagon } from 'lucide-vue-next'

export interface UiAlertProps {
  type?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  message?: string
  dismissible?: boolean
  autoClose?: boolean
  duration?: number
  icon?: boolean
  color?: 'fuchsia' | 'emerald' | 'amber' | 'rose' | 'indigo' | 'cyan'
}

const props = withDefaults(defineProps<UiAlertProps>(), {
  type: 'info',
  dismissible: true,
  autoClose: false,
  duration: 4000,
  icon: true,
  color: undefined,
})

const emit = defineEmits(['close'])

const visible = ref(true)
const close = (): void => {
  visible.value = false
  emit('close')
}

// Auto-close support
onMounted(() => {
  if (props.autoClose) {
    setTimeout(() => close(), props.duration)
  }
})

// Color mapping
const colors: Record<string, { bg: string; border: string; text: string }> = {
  info: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400' },
  success: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400' },
  warning: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400' },
  error: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400' },
}

// Icon mapping
const iconMap: Record<string, any> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertOctagon,
}
</script>

<template>
  <transition name="fade">
    <div
        v-if="visible"
        class="rounded-2xl border px-4 py-3 flex items-start gap-3 backdrop-blur-xl relative overflow-hidden"
        role="alert"
        :class="[
        colors[type]?.bg,
        colors[type]?.border,
        'shadow-[0_0_20px_rgba(255,255,255,0.04)] text-gray-200 transition-all',
      ]"
    >
      <!-- Gradient accent -->
      <div
          class="absolute left-0 top-0 h-full w-1 bg-gradient-to-b"
          :class="{
          'from-cyan-400 to-indigo-500': type === 'info',
          'from-emerald-400 to-cyan-400': type === 'success',
          'from-amber-400 to-orange-500': type === 'warning',
          'from-rose-500 to-fuchsia-500': type === 'error',
        }"
      />

      <!-- Icon -->
      <component
          v-if="icon"
          :is="iconMap[type]"
          class="w-5 h-5 mt-0.5 shrink-0"
          :class="colors[type]?.text"
      />

      <!-- Text Content -->
      <div class="flex-1 min-w-0">
        <p v-if="title" class="font-semibold text-sm mb-0.5">{{ title }}</p>
        <p v-if="message" class="text-sm text-gray-300 leading-snug">{{ message }}</p>
        <slot />
      </div>

      <!-- Actions -->
      <slot name="actions"/>

      <!-- Dismiss -->
      <button
          v-if="dismissible"
          @click="close"
          class="absolute top-2 ltr:right-2 rtl:left-2 text-gray-400 hover:text-white transition"
          aria-label="Close"
      >
        <X class="w-4 h-4" />
      </button>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
