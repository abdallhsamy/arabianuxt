<script setup lang="ts">
import { ref } from 'vue'

export interface ChatMessage { from: 'user' | 'ai'; text: string }

const messages = ref<ChatMessage[]>([])
const input = ref('')
const open = ref(false)

const send = (): void => {
  if (!input.value.trim()) return
  messages.value.push({ from: 'user', text: input.value })
  const reply = `🤖 AI: Received "${input.value}" (mock reply)`
  setTimeout(() => messages.value.push({ from: 'ai', text: reply }), 500)
  input.value = ''
}
</script>

<template>
  <div>
    <button
        class="fixed bottom-6 right-6 rounded-full bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white w-12 h-12 flex items-center justify-center shadow-lg"
        @click="open = !open"
    >
      💬
    </button>

    <transition name="fade">
      <div
          v-if="open"
          class="fixed bottom-20 right-6 w-80 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 flex flex-col h-96"
      >
        <div class="flex-1 overflow-y-auto space-y-3 mb-3">
          <div
              v-for="(m,i) in messages"
              :key="i"
              class="px-3 py-2 rounded-lg"
              :class="m.from==='user'?'bg-fuchsia-600/40 self-end text-right':'bg-white/5 self-start text-left'"
          >
            {{ m.text }}
          </div>
        </div>
        <div class="flex gap-2">
          <input
              v-model="input"
              @keyup.enter="send"
              placeholder="Ask me anything..."
              class="flex-1 bg-transparent border border-white/10 text-gray-100 rounded-lg px-3 py-1.5 outline-none"
          />
          <button
              class="px-3 rounded-lg bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white"
              @click="send"
          >
            Send
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,.fade-leave-active{transition:opacity .25s ease}
.fade-enter-from,.fade-leave-to{opacity:0}
</style>
