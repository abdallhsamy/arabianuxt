<script setup lang="ts">
import { ref } from 'vue'
import { Settings, Sun, Moon, Timer, Wrench } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const { t } = useI18n()

const envName = ref('Production')
const sessionTimeout = ref(30)
const theme = ref<'dark'|'light'>('dark')
const maintenance = ref(false)

const saveAll = (): void => {
  alert('Settings saved')
}
</script>

<template>
  <section class="space-y-8">
    <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400">
      {{ t('pages.system.title') }}
    </h1>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Environment -->
      <div class="p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#8B5CF6_0%,#22D3EE_60%,#EC4899_100%)] animate-rotate-gradient">
        <div class="rounded-2xl bg-[rgba(15,17,23,0.92)] backdrop-blur-xl border border-white/10 p-6">
          <h2 class="text-white font-semibold text-lg mb-4 flex items-center gap-2"><Settings class="w-5 h-5 text-cyan-400" /> {{ t('pages.system.environment') }}</h2>
          <input v-model="envName" class="input-dark w-full" :placeholder="t('pages.system.environmentName')" />
        </div>
      </div>

      <!-- Theme -->
      <div class="p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#22D3EE_0%,#8B5CF6_60%,#EC4899_100%)] animate-rotate-gradient">
        <div class="rounded-2xl bg-[rgba(15,17,23,0.92)] backdrop-blur-xl border border-white/10 p-6">
          <h2 class="text-white font-semibold text-lg mb-4 flex items-center gap-2"><Sun class="w-5 h-5 text-amber-300" /> {{ t('pages.system.theme') }}</h2>
          <div class="flex items-center gap-3">
            <button class="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white flex items-center gap-2" @click="theme = 'dark'"><Moon class="w-4 h-4" /> {{ t('pages.system.dark') }}</button>
            <button class="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white flex items-center gap-2" @click="theme = 'light'"><Sun class="w-4 h-4" /> {{ t('pages.system.light') }}</button>
            <span class="text-gray-400 text-sm">{{ t('pages.system.selected') }} {{ theme }}</span>
          </div>
        </div>
      </div>

      <!-- Session -->
      <div class="p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#EC4899_0%,#8B5CF6_50%,#22D3EE_100%)] animate-rotate-gradient">
        <div class="rounded-2xl bg-[rgba(15,17,23,0.92)] backdrop-blur-xl border border-white/10 p-6">
          <h2 class="text-white font-semibold text-lg mb-4 flex items-center gap-2"><Timer class="w-5 h-5 text-indigo-400" /> {{ t('pages.system.sessionTimeout') }}</h2>
          <div class="flex items-center gap-3">
            <input v-model.number="sessionTimeout" type="number" min="5" max="240" class="input-dark w-28" />
            <span class="text-gray-300 text-sm">{{ t('pages.system.minutes') }}</span>
          </div>
        </div>
      </div>

      <!-- Maintenance -->
      <div class="p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#22D3EE_0%,#EC4899_50%,#8B5CF6_100%)] animate-rotate-gradient">
        <div class="rounded-2xl bg-[rgba(15,17,23,0.92)] backdrop-blur-xl border border-white/10 p-6">
          <h2 class="text-white font-semibold text-lg mb-4 flex items-center gap-2"><Wrench class="w-5 h-5 text-rose-400" /> {{ t('pages.system.maintenanceMode') }}</h2>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="maintenance" class="sr-only peer" />
            <div class="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-indigo-500 peer-checked:to-fuchsia-500 transition-all"></div>
            <div class="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
          </label>
          <span class="ms-3 text-sm text-white">{{ maintenance ? t('pages.system.enabled') : t('pages.system.disabled') }}</span>
        </div>
      </div>
    </div>

    <div class="text-right">
      <button class="px-6 py-2 rounded-xl text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 hover:brightness-110 transition-all font-semibold" @click="saveAll">
        {{ t('pages.system.saveSettings') }}
      </button>
    </div>
  </section>
</template>

<style scoped>
@property --angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
@keyframes rotate-gradient { to { --angle: 360deg; } }
.animate-rotate-gradient { background-size: 200% 200%; animation: rotate-gradient 14s linear infinite; }
.input-dark { background-color: rgba(25,27,33,0.95); border: 1px solid rgba(255,255,255,0.08); color: var(--text-primary); border-radius: 0.75rem; padding: 0.75rem 1rem; transition: all .25s ease; }
.input-dark:focus { outline: none; border-color: rgba(236,72,153,0.4); box-shadow: 0 0 0 2px rgba(236,72,153,0.2); }
</style>
