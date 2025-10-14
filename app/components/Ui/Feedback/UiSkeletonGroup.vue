<script setup lang="ts">
import { ref, watch, nextTick } from "vue";

export interface UiSkeletonGroupProps {
  loading: boolean;
  fadeDuration?: number;
}

const props = withDefaults(defineProps<UiSkeletonGroupProps>(), {
  fadeDuration: 350,
});

const isVisible = ref(props.loading);

/* when loading ends → fade out skeletons smoothly */
watch(
  () => props.loading,
  async val => {
    if (!val) {
      await nextTick();
      setTimeout(() => {
        isVisible.value = false;
      }, props.fadeDuration);
    } else {
      isVisible.value = true;
    }
  },
  { immediate: true }
);

const emit = defineEmits<{ (e: "loaded"): void }>();

watch(isVisible, v => {
  if (!v) emit("loaded");
});
</script>

<template>
  <div class="relative w-full">
    <transition
      name="fade"
      :duration="{ enter: 150, leave: props.fadeDuration }"
      appear
    >
      <div
        v-if="props.loading && isVisible"
        class="absolute inset-0 flex flex-col gap-3 bg-black/0 pointer-events-none"
      >
        <slot name="skeletons" />
      </div>
    </transition>

    <transition
      name="fade"
      :duration="{ enter: props.fadeDuration, leave: 150 }"
      appear
    >
      <div v-if="!props.loading" class="relative z-10">
        <slot />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
