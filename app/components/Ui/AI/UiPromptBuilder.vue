<script setup lang="ts">
import { ref } from 'vue'

const system = ref('')
const user = ref('')
const tags = ref<string[]>([])
const tagInput = ref('')

const addTag = () => {
  if (tagInput.value && !tags.value.includes(tagInput.value)) {
    tags.value.push(tagInput.value)
    tagInput.value = ''
  }
}
const removeTag = (t: string) => (tags.value = tags.value.filter(x => x !== t))
</script>

<template>
  <div class="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl space-y-4">
    <h2 class="text-lg font-semibold text-gray-100">🧠 Prompt Builder</h2>

    <div>
      <label class="text-sm text-gray-400">System Role</label>
      <textarea
          v-model="system"
          placeholder="Define the AI behavior or context..."
          class="w-full bg-transparent border border-white/10 rounded-lg p-2 text-gray-100 text-sm mt-1"
      />
    </div>

    <div>
      <label class="text-sm text-gray-400">User Input</label>
      <textarea
          v-model="user"
          placeholder="Ask your question or give input..."
          class="w-full bg-transparent border border-white/10 rounded-lg p-2 text-gray-100 text-sm mt-1"
      />
    </div>

    <div>
      <label class="text-sm text-gray-400">Tags</label>
      <div class="flex flex-wrap gap-2 mt-2">
        <span
            v-for="t in tags"
            :key="t"
            class="px-2 py-1 rounded-md bg-fuchsia-600/30 text-xs text-gray-100 cursor-pointer hover:bg-fuchsia-600/50"
            @click="removeTag(t)"
        >
          {{ t }} ✕
        </span>
      </div>
      <input
          v-model="tagInput"
          placeholder="Add tag and press Enter"
          @keydown.enter.prevent="addTag"
          class="mt-2 w-full bg-transparent border border-white/10 rounded-md p-2 text-gray-100 text-sm"
      />
    </div>

    <div>
      <label class="text-sm text-gray-400">Preview</label>
      <pre class="bg-black/40 text-gray-300 text-sm p-3 rounded-lg whitespace-pre-wrap">
System: {{ system }}
User: {{ user }}
Tags: {{ tags.join(', ') }}
      </pre>
    </div>
  </div>
</template>
