<script setup lang="ts">
import { ref, onMounted } from "vue";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import bash from "highlight.js/lib/languages/bash";
import json from "highlight.js/lib/languages/json";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("json", json);

const props = defineProps<{ code: string; lang?: string }>();
const codeRef = ref<HTMLElement>();
const copied = ref(false);

onMounted(() => {
  if (codeRef.value) hljs.highlightElement(codeRef.value);
});

const copy = async () => {
  await navigator.clipboard.writeText(props.code);
  copied.value = true;
  setTimeout(() => (copied.value = false), 1500);
};
</script>

<template>
  <div class="relative">
    <pre
      class="rounded-xl bg-black/70 border border-white/10 p-4 overflow-x-auto text-sm text-gray-100"
    >
      <code ref="codeRef" :class="props.lang">{{ props.code }}</code>
    </pre>
    <button
      class="absolute top-2 right-3 text-xs text-gray-400 hover:text-cyan-400"
      @click="copy"
    >
      {{ copied ? "Copied!" : "Copy" }}
    </button>
  </div>
</template>

<style scoped>
.hljs-keyword {
  color: #93c5fd;
}
.hljs-string {
  color: #f9a8d4;
}
.hljs-number {
  color: #fbbf24;
}
.hljs-comment {
  color: #6b7280;
}
.hljs-attr {
  color: #5eead4;
}
</style>
