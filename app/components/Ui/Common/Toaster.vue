<script setup lang="ts">
import { ref, onUnmounted } from "vue";
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from "lucide-vue-next";

export type ToastType = "success" | "error" | "warning" | "info" | "custom";
export interface Toast {
  id?: string;
  title: string;
  message?: string;
  type?: ToastType;
  duration?: number;
  actionLabel?: string;
  onAction?: () => void;
  groupKey?: string;
}

const props = defineProps<{ position?: string }>();
const position = props.position ?? "top-right";
const toasts = ref<Toast[]>([]);
const timers = new Map<string, NodeJS.Timeout>();

// ✅ FIXED HERE ↓
const push = (t: Toast) => {
  // Parentheses around ?? expression
  const id = t.id || (crypto.randomUUID?.() ?? String(Date.now()));

  const toast: Toast = {
    id,
    duration: t.duration ?? 4000,
    type: t.type ?? "info",
    ...t,
  };

  // group similar toasts
  if (t.groupKey) {
    const existing = toasts.value.find(x => x.groupKey === t.groupKey);
    if (existing) {
      existing.title = t.title;
      existing.message = t.message;
      return;
    }
  }

  toasts.value.unshift(toast);
  const timer = setTimeout(() => remove(id), toast.duration);
  timers.set(id, timer);
};

const remove = (id: string) => {
  toasts.value = toasts.value.filter(t => t.id !== id);
  if (timers.has(id)) {
    const timer = timers.get(id);
    if (timer) clearTimeout(timer);
  }
  timers.delete(id);
};

const pauseTimer = (id: string) => {
  if (timers.has(id)) {
    const timer = timers.get(id);
    if (timer) clearTimeout(timer);
  }
};

const resumeTimer = (id: string, duration?: number) => {
  if (duration) {
    const timer = setTimeout(() => remove(id), duration);
    timers.set(id, timer);
  }
};

defineExpose({ push, remove });
onUnmounted(() => timers.forEach(clearTimeout));
</script>

<template>
  <div
    :class="[
      'fixed z-[9999] flex flex-col gap-3 p-4 pointer-events-none',
      position.includes('top') ? 'top-0' : 'bottom-0',
      position.includes('right') ? 'right-0' : 'left-0',
    ]"
  >
    <transition-group name="toast" tag="div">
      <div
        v-for="t in toasts"
        :key="t.id"
        class="pointer-events-auto relative flex items-start gap-3 p-4 rounded-2xl border border-white/10 backdrop-blur-xl text-white shadow-xl w-80 bg-[rgba(15,17,23,0.9)] overflow-hidden group"
        @mouseenter="t.id && pauseTimer(t.id)"
        @mouseleave="t.id && resumeTimer(t.id, t.duration)"
      >
        <!-- Icon -->
        <component
          :is="
            t.type === 'success'
              ? CheckCircle2
              : t.type === 'error'
                ? XCircle
                : t.type === 'warning'
                  ? AlertTriangle
                  : Info
          "
          class="w-5 h-5 flex-shrink-0"
          :class="{
            'text-emerald-400': t.type === 'success',
            'text-rose-400': t.type === 'error',
            'text-amber-400': t.type === 'warning',
            'text-cyan-400': t.type === 'info',
          }"
        />

        <!-- Content -->
        <div class="flex-1">
          <p class="font-semibold leading-tight">{{ t.title }}</p>
          <p v-if="t.message" class="text-sm text-gray-300 mt-1">
            {{ t.message }}
          </p>

          <button
            v-if="t.actionLabel"
            class="mt-2 text-xs font-medium text-cyan-400 hover:text-white transition"
            @click="t.onAction ? t.onAction() : t.id && remove(t.id)"
          >
            {{ t.actionLabel }}
          </button>
        </div>

        <!-- Dismiss -->
        <button
          class="absolute top-2 ltr:right-2 rtl:left-2 text-gray-400 hover:text-white"
          @click="t.id && remove(t.id)"
        >
          <X class="w-4 h-4" />
        </button>

        <!-- Progress -->
        <div
          class="absolute bottom-0 left-0 h-1"
          :class="{
            'bg-gradient-to-r from-emerald-400 to-cyan-400':
              t.type === 'success',
            'bg-gradient-to-r from-rose-500 to-fuchsia-500': t.type === 'error',
            'bg-gradient-to-r from-amber-400 to-orange-500':
              t.type === 'warning',
            'bg-gradient-to-r from-cyan-400 to-indigo-400': t.type === 'info',
          }"
          :style="{
            width: '100%',
            animation: `progress ${t.duration || 4000}ms linear forwards`,
          }"
        />
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
@keyframes progress {
  from {
    width: 100%;
  }
  to {
    width: 0;
  }
}
.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(10px) scale(0.95);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}
</style>
