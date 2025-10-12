<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

type Rule = {
  id: string
  name: string
  when: string
  condition?: string
  action: string
  enabled: boolean
}

const rules = ref<Rule[]>([
  { id:'r1', name:'Alert on failed login', when:'security.failed_login', condition:'count ≥ 3 in 5m', action:'notify.slack(#security)', enabled:true },
  { id:'r2', name:'Invoice paid → thank-you email', when:'billing.invoice_paid', action:'email.customer(template=thankyou)', enabled:true },
  { id:'r3', name:'High CPU', when:'infra.cpu>85%', action:'scale.up(service=api)', enabled:false },
])

const open = ref(false)
const form = ref<Rule>({ id:'new', name:'', when:'', condition:'', action:'', enabled:true })

const addRule = (): void => {
  if (!form.value.name || !form.value.when || !form.value.action) return
  rules.value.unshift({ ...form.value, id: crypto.randomUUID?.() ?? String(Date.now()) })
  open.value = false
  form.value = { id:'new', name:'', when:'', condition:'', action:'', enabled:true }
}
</script>

<template>
  <section class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400">{{ t('pages.automationRules.title') }}</h1>
      <button class="px-4 py-2 rounded-xl text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 hover:brightness-110" @click="open = true">
        {{ t('pages.automationRules.newRule') }}
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <div v-for="r in rules" :key="r.id" class="p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#8B5CF6_0%,#22D3EE_55%,#EC4899_100%)] animate-rotate-gradient">
        <div class="rounded-2xl bg-[rgba(15,17,23,0.94)] border border-white/10 p-4">
          <div class="flex items-center justify-between">
            <h4 class="text-white font-semibold truncate">{{ r.name }}</h4>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="r.enabled" class="sr-only peer" />
              <div class="w-10 h-5 bg-gray-700 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-indigo-500 peer-checked:to-fuchsia-500 transition-all"></div>
              <div class="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
            </label>
          </div>
          <div class="mt-2 text-xs text-gray-300">
            <p><span class="text-gray-400">{{ t('pages.automationRules.when') }}</span> {{ r.when }}</p>
            <p v-if="r.condition"><span class="text-gray-400">{{ t('pages.automationRules.if') }}</span> {{ r.condition }}</p>
            <p><span class="text-gray-400">{{ t('pages.automationRules.then') }}</span> {{ r.action }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- UiModal -->
    <div v-if="open" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
      <div class="w-full max-w-lg p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#22D3EE_0%,#8B5CF6_60%,#EC4899_100%)] animate-rotate-gradient">
        <div class="rounded-2xl bg-[rgba(15,17,23,0.96)] border border-white/10 p-6">
          <h3 class="text-white font-semibold mb-3">{{ t('pages.automationRules.createRule') }}</h3>
          <div class="grid grid-cols-1 gap-3">
            <input v-model="form.name" class="input-dark" :placeholder="t('pages.automationRules.ruleName')" />
            <input v-model="form.when" class="input-dark" :placeholder="t('pages.automationRules.event')" />
            <input v-model="form.condition" class="input-dark" :placeholder="t('pages.automationRules.condition')" />
            <input v-model="form.action" class="input-dark" :placeholder="t('pages.automationRules.action')" />
          </div>
          <div class="text-right mt-4">
            <button class="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white me-2" @click="open = false">{{ t('pages.automationRules.cancel') }}</button>
            <button class="px-4 py-2 rounded-xl text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 hover:brightness-110" @click="addRule">{{ t('pages.automationRules.add') }}</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.input-dark{background-color:rgba(25,27,33,.95);border:1px solid rgba(255,255,255,.08);color:white;border-radius:.75rem;padding:.6rem .9rem}
@property --angle{syntax:'<angle>';initial-value:0deg;inherits:false}
@keyframes rotate-gradient{to{--angle:360deg}}
.animate-rotate-gradient{background-size:200% 200%;animation:rotate-gradient 12s linear infinite}
</style>
