<script setup lang="ts">
import { ref } from 'vue'
import { KeyRound, RefreshCw, Check, PlugZap, Link as LinkIcon, Unplug, Globe } from 'lucide-vue-next'
import Modal from '~/components/Ui/Common/Modal.vue'

const apiKey = ref('sk-live-********-A1B2')
const showKey = ref(false)
const regenOpen = ref(false)

const copyKey = (): void => {
  navigator.clipboard.writeText(apiKey.value.replace('********', '********')) // stays masked for safety
}

const providers = ref([
  { name: 'Slack', connected: true },
  { name: 'GitHub', connected: false },
  { name: 'Notion', connected: true },
  { name: 'Linear', connected: false },
])

type Webhook = { id: string; url: string; secret: string; status: 'active'|'paused' }
const webhooks = ref<Webhook[]>([
  { id: 'wh_01', url: 'https://example.com/hooks/billing', secret: 'whsec_****************', status: 'active' },
  { id: 'wh_02', url: 'https://example.com/hooks/security', secret: 'whsec_****************', status: 'paused' },
])

const confirmRegen = (): void => { regenOpen.value = true }
const doRegen = (): void => {
  // Normally request a new key from backend; don’t generate on client
  apiKey.value = 'sk-live-********-Z9X8'
  regenOpen.value = false
}
const testPing = (w: Webhook): void => {
  alert(`Ping sent to ${w.url}`)
}
</script>

<template>
  <section class="space-y-8">
    <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400">
      Integrations
    </h1>

    <!-- API Keys -->
    <div class="p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#8B5CF6_0%,#22D3EE_60%,#EC4899_100%)] animate-rotate-gradient">
      <div class="rounded-2xl bg-[rgba(15,17,23,0.92)] backdrop-blur-xl border border-white/10 p-6">
        <h2 class="text-white font-semibold text-lg mb-4 flex items-center gap-2"><KeyRound class="w-5 h-5 text-cyan-400" /> API Key</h2>
        <div class="flex items-center gap-3">
          <input :value="showKey ? apiKey : 'sk-live-********-****'" readonly class="input-dark w-full" />
          <button class="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white" @click="showKey = !showKey">
            {{ showKey ? 'Hide' : 'Show' }}
          </button>
          <button class="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white flex items-center gap-2" @click="copyKey">
            <Check class="w-4 h-4" /> Copy
          </button>
          <button class="px-3 py-2 rounded-xl text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 hover:brightness-110 flex items-center gap-2" @click="confirmRegen">
            <RefreshCw class="w-4 h-4" /> Regenerate
          </button>
        </div>
      </div>
    </div>

    <!-- Providers -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="p in providers" :key="p.name" class="p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#22D3EE_0%,#8B5CF6_60%,#EC4899_100%)] animate-rotate-gradient">
        <div class="rounded-2xl bg-[rgba(15,17,23,0.92)] backdrop-blur-xl border border-white/10 p-6 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <PlugZap class="w-5 h-5 text-fuchsia-400" />
            <div>
              <p class="text-white font-semibold">{{ p.name }}</p>
              <p class="text-xs text-gray-400">{{ p.connected ? 'Connected' : 'Disconnected' }}</p>
            </div>
          </div>
          <button
              class="px-4 py-2 rounded-xl text-white transition-all flex items-center gap-2"
              :class="p.connected ? 'bg-white/10 hover:bg-white/15' : 'bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 hover:brightness-110'"
          >
            <component :is="p.connected ? Unplug : LinkIcon" class="w-4 h-4" />
            {{ p.connected ? 'Disconnect' : 'Connect' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Webhooks -->
    <div class="p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#EC4899_0%,#8B5CF6_50%,#22D3EE_100%)] animate-rotate-gradient">
      <div class="rounded-2xl bg-[rgba(15,17,23,0.92)] backdrop-blur-xl border border-white/10 p-6 overflow-x-auto">
        <h2 class="text-white font-semibold text-lg mb-4 flex items-center gap-2"><Globe class="w-5 h-5 text-indigo-400" /> Webhooks</h2>
        <table class="w-full text-sm">
          <thead class="text-gray-400">
          <tr class="text-left"><th class="py-2">URL</th><th class="py-2">Secret</th><th class="py-2">Status</th><th class="py-2 text-right">Actions</th></tr>
          </thead>
          <tbody class="divide-y divide-white/10">
          <tr v-for="w in webhooks" :key="w.id" class="hover:bg-white/5 transition-colors">
            <td class="py-3 text-white">{{ w.url }}</td>
            <td class="py-3 text-gray-300">{{ w.secret }}</td>
            <td class="py-3">
                <span class="px-2 py-1 rounded-full text-xs border" :class="w.status==='active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-400/30' : 'bg-gray-600/30 text-gray-300 border-gray-400/30'">
                  {{ w.status }}
                </span>
            </td>
            <td class="py-3 text-right">
              <button class="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white" @click="testPing(w)">Send Test</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Regenerate Modal -->
    <Modal v-model:open="regenOpen" title="Regenerate API Key" confirm-text="Regenerate">
      <p class="text-gray-300">
        Regenerating invalidates the current key immediately. Clients using the old key will fail until updated.
      </p>
    </Modal>
  </section>
</template>

<style scoped>
@property --angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
@keyframes rotate-gradient { to { --angle: 360deg; } }
.animate-rotate-gradient { background-size: 200% 200%; animation: rotate-gradient 14s linear infinite; }
.input-dark { background-color: rgba(25,27,33,0.95); border: 1px solid rgba(255,255,255,0.08); color: var(--text-primary); border-radius: 0.75rem; padding: 0.75rem 1rem; transition: all .25s ease; }
.input-dark:focus { outline: none; border-color: rgba(236,72,153,0.4); box-shadow: 0 0 0 2px rgba(236,72,153,0.2); }
</style>
