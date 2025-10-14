<script setup lang="ts">
import { ref, onMounted } from "vue";

defineProps<{ left: string; right: string }>();

const leftRef = ref<HTMLPreElement>();
const rightRef = ref<HTMLPreElement>();

onMounted(() => {
  const sync = (src: HTMLElement, dst: HTMLElement) =>
    src.addEventListener("scroll", () => (dst.scrollTop = src.scrollTop));
  if (leftRef.value && rightRef.value) {
    sync(leftRef.value, rightRef.value);
    sync(rightRef.value, leftRef.value);
  }
});
</script>

<template>
  <div
    class="grid grid-cols-2 gap-2 rounded-xl border border-white/10 overflow-hidden"
  >
    <pre
      ref="leftRef"
      class="bg-black/60 p-3 text-gray-300 overflow-auto max-h-[480px]"
      >{{ left }}</pre
    >
    <pre
      ref="rightRef"
      class="bg-black/60 p-3 text-gray-300 overflow-auto max-h-[480px]"
      >{{ right }}</pre
    >
  </div>
</template>
