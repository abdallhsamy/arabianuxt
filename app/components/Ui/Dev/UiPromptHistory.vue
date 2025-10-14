<script setup lang="ts">
import { ref, watch, onMounted } from "vue";

interface Prompt {
  id: string;
  role: "user" | "assistant";
  content: string;
  ts: number;
}

const key = "ui_prompt_history";
const history = ref<Prompt[]>([]);

onMounted(() => {
  const stored = localStorage.getItem(key);
  if (stored) history.value = JSON.parse(stored);
});

watch(history, v => localStorage.setItem(key, JSON.stringify(v)), {
  deep: true,
});

const clear = () => (history.value = []);
</script>

<template>
  <div class="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-2">
    <div class="flex justify-between items-center mb-2">
      <h3 class="font-semibold text-gray-100">🧠 Prompt History</h3>
      <button class="text-xs text-fuchsia-400 hover:underline" @click="clear">
        Clear
      </button>
    </div>
    <div class="max-h-80 overflow-auto text-sm space-y-2">
      <div v-for="p in history" :key="p.id" class="p-2 rounded-lg bg-black/40">
        <div class="flex justify-between text-xs text-gray-500">
          <span>{{ p.role }}</span>
          <span>{{ new Date(p.ts).toLocaleString() }}</span>
        </div>
        <p class="text-gray-200 mt-1">{{ p.content }}</p>
      </div>
      <p v-if="!history.length" class="text-gray-500 text-center text-sm">
        No prompts yet.
      </p>
    </div>
  </div>
</template>
