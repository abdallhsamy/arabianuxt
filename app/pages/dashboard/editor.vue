<script setup lang="ts">
import UiRichEditor from '~/components/Ui/Editor/UiRichEditor.vue'
import { ref } from 'vue'

const content = ref('<p><strong>Hello</strong> world!</p>')
</script>

<template>
  <section class="p-8 text-gray-100 space-y-6">
    <h1 class="text-2xl font-bold">📝 Rich Text Editor Demo</h1>
    <UiRichEditor v-model="content" placeholder="Start typing like in Notion..." />
    <h3 class="text-lg font-semibold text-gray-400 mt-6">Live HTML Output</h3>
    <pre class="bg-black/60 text-xs text-gray-300 p-3 rounded-lg overflow-auto">{{ content }}</pre>
  </section>
</template>
