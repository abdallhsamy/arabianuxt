<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { X } from "lucide-vue-next";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

export interface UiModalProps {
  modelValue: boolean;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl";
  closable?: boolean;
  persistent?: boolean;
  blur?: boolean;
  glass?: boolean;
  scrollLock?: boolean;
}

const props = withDefaults(defineProps<UiModalProps>(), {
  size: "md",
  closable: true,
  persistent: false,
  blur: true,
  glass: true,
  scrollLock: true,
});

const emit = defineEmits(["update:modelValue", "open", "close"]);

const visible = ref(props.modelValue);

watch(
  () => props.modelValue,
  val => {
    visible.value = val;
    if (val) emit("open");
    else emit("close");
  }
);

const close = () => {
  if (!props.closable || props.persistent) return;
  visible.value = false;
  emit("update:modelValue", false);
};

const handleEsc = (e: KeyboardEvent) => {
  if (e.key === "Escape") close();
};

onMounted(() => {
  document.addEventListener("keydown", handleEsc);
  if (props.scrollLock && visible.value)
    document.body.style.overflow = "hidden";
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleEsc);
  if (props.scrollLock) document.body.style.overflow = "";
});

watch(visible, v => {
  if (props.scrollLock) document.body.style.overflow = v ? "hidden" : "";
});

const sizes: Record<string, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};
</script>

<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <!-- Overlay -->
      <div
        class="absolute inset-0 bg-black/60 transition-opacity"
        @click="!persistent && close()"
      ></div>

      <!-- UiModal Container -->
      <transition name="scale">
        <div
          class="relative z-10 w-full mx-4 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          :class="[
            sizes[size],
            glass ? 'bg-white/10 backdrop-blur-2xl' : 'bg-gray-900',
            blur ? 'backdrop-saturate-150' : '',
          ]"
        >
          <!-- Header -->
          <header
            v-if="title || $slots.header"
            class="flex items-center justify-between px-6 py-4 border-b border-white/10"
          >
            <slot name="header">
              <h3 class="text-lg font-semibold text-gray-100">{{ title }}</h3>
            </slot>
            <button
              v-if="closable"
              @click="close"
              class="text-gray-400 hover:text-white transition"
              :aria-label="t('components.uiModal.closeLabel')"
            >
              <X class="w-5 h-5" />
            </button>
          </header>

          <!-- Body -->
          <div class="p-6 text-gray-200 text-sm overflow-y-auto max-h-[70vh]">
            <slot />
          </div>

          <!-- Footer -->
          <footer
            v-if="$slots.footer"
            class="px-6 py-4 border-t border-white/10 flex justify-end gap-3"
          >
            <slot name="footer" />
          </footer>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-enter-active {
  transition: all 0.25s ease;
}
.scale-enter-from {
  transform: scale(0.9);
  opacity: 0;
}
.scale-leave-to {
  transform: scale(0.9);
  opacity: 0;
}
</style>
