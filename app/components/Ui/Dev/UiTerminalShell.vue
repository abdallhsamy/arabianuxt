<script setup lang="ts">
import { ref } from 'vue'

interface Entry { id: string; text: string; kind: 'in' | 'out' }

const props = withDefaults(defineProps<{ prompt?: string }>(), { prompt: 'user@nuxt:~$' })
const history = ref<Entry[]>([
  { id: crypto.randomUUID(), text: 'Type `help` to list commands.', kind: 'out' }
])
const line = ref('')

const commands: Record<string, () => string> = {
  help: () => 'Available: help, date, whoami, clear, echo <text>',
  date: () => new Date().toString(),
  whoami: () => 'nuxt-user',
  clear: () => { history.value = []; return '' },
}

const run = (): void => {
  const input = line.value.trim()
  if (!input) return
  history.value.push({ id: crypto.randomUUID(), text: `${props.prompt} ${input}`, kind: 'in' })
  const [cmd, ...args] = input.split(' ')
  const handler = commands[cmd || ''] || (() => `command not found: ${cmd}`)
  const out = cmd === 'echo' ? args.join(' ') : handler()
  if (out) history.value.push({ id: crypto.randomUUID(), text: out, kind: 'out' })
  line.value = ''
}
</script>

<template>
  <div class="rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl overflow-hidden">
    <header class="px-3 py-2 border-b border-white/10 text-sm text-gray-300">Mock Terminal</header>
    <div class="max-h-72 overflow-auto font-mono text-[12px] p-3 space-y-1">
      <div v-for="e in history" :key="e.id" :class="e.kind==='in' ? 'text-gray-100' : 'text-gray-300'">{{ e.text }}</div>
    </div>
    <div class="flex items-center gap-2 border-t border-white/10 p-2">
      <span class="font-mono text-[12px] text-gray-400">{{ props.prompt }}</span>
      <input
          v-model="line"
          class="flex-1 bg-transparent outline-none text-gray-100 text-sm"
          @keydown.enter.prevent="run"
          placeholder="type a command..."
      />
      <button class="px-3 py-1 rounded bg-white/5 text-gray-200 hover:bg-white/10" @click="run">Run</button>
    </div>
  </div>
</template>
