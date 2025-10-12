<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { Bot, Send, Sparkles } from 'lucide-vue-next'

const { t } = useI18n()

type Msg = { id: string; role: 'user'|'assistant'; text: string }
const open = ref(true)
const input = ref('')
const messages = ref<Msg[]>([
  { id: 'm1', role: 'assistant', text: t('pages.assistant.welcomeMessage') }
])

const send = async (): Promise<void> => {
  const val = input.value.trim()
  if (!val) return
  messages.value.push({ id: crypto.randomUUID?.() ?? String(Date.now()), role: 'user', text: val })
  input.value = ''
  await nextTick()
  // mock assistant reply
  setTimeout(() => {
    messages.value.push({ id: crypto.randomUUID?.() ?? String(Date.now()), role: 'assistant', text: t('pages.assistant.responseMessage', { query: val }) })
  }, 600)
}
</script>

<template>
  <section>
    <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400 mb-6">{{ t('pages.assistant.title') }}</h1>

    <div class="relative">
      <!-- Dock -->
      <div class="fixed right-6 bottom-6 z-40">
        <button
            @click="open = !open"
            class="rounded-full p-3 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 text-white shadow-lg hover:brightness-110 transition-all"
            :title="t('pages.assistant.toggleAssistant')"
        >
          <Sparkles class="w-5 h-5" />
        </button>
      </div>

      <!-- Panel -->
      <transition name="fade">
        <div v-if="open" class="fixed right-6 bottom-20 z-40 w-[360px] max-h-[70vh] flex flex-col p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#8B5CF6_0%,#EC4899_60%,#22D3EE_100%)] animate-rotate-gradient">
          <div class="rounded-2xl bg-[rgba(15,17,23,0.96)] backdrop-blur-2xl border border-white/10 p-4 flex flex-col min-h-[320px] max-h-[70vh]">
            <div class="flex items-center gap-2 mb-3 text-white font-semibold"><Bot class="w-5 h-5 text-cyan-400" /> {{ t('pages.assistant.assistant') }}</div>

            <div class="flex-1 overflow-y-auto space-y-3 pr-1">
              <div v-for="m in messages" :key="m.id" class="flex" :class="m.role === 'user' ? 'justify-end' : 'justify-start'">
                <div
                    class="rounded-xl px-3 py-2 text-sm max-w-[80%] border"
                    :class="m.role === 'user'
                    ? 'bg-gradient-to-r from-indigo-500/30 to-fuchsia-500/30 text-white border-white/10'
                    : 'bg-white/5 text-gray-200 border-white/10'"
                >
                  {{ m.text }}
                </div>
              </div>
            </div>

            <form class="mt-3 flex gap-2" @submit.prevent="send">
              <input v-model="input" class="input-dark flex-1" :placeholder="t('pages.assistant.inputPlaceholder')" />
              <button class="px-3 py-2 rounded-xl text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 hover:brightness-110 transition-all" :title="t('pages.assistant.send')">
                <Send class="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<style scoped>
@property --angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
@keyframes rotate-gradient { to { --angle: 360deg; } }
.animate-rotate-gradient { background-size: 200% 200%; animation: rotate-gradient 12s linear infinite; }
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.input-dark { background-color: rgba(25,27,33,0.95); border: 1px solid rgba(255,255,255,0.08); color: var(--text-primary); border-radius: 0.75rem; padding: 0.6rem 0.9rem; transition: all .25s ease; }
.input-dark:focus { outline: none; border-color: rgba(236,72,153,0.4); box-shadow: 0 0 0 2px rgba(236,72,153,0.2); }
</style>
