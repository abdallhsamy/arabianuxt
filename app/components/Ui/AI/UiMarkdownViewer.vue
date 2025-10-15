<script setup lang="ts">
/* eslint-disable vue/no-v-html */
import { ref, watch, onMounted } from "vue";
import { marked } from "marked";
import DOMPurify from "dompurify";

const props = defineProps<{ content: string }>();
const html = ref("");

const render = async () => {
  const raw = await marked.parse(props.content);
  html.value = DOMPurify.sanitize(raw as string);
};
onMounted(render);
watch(() => props.content, render);
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div
    class="prose prose-invert max-w-none bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-xl"
    v-html="html"
  ></div>
</template>
