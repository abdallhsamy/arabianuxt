<script setup lang="ts">
import { ref, computed } from 'vue'

type Article = { id:string; title:string; category:string; content:string }
const query = ref('')
const category = ref<'All'|'Getting Started'|'Security'|'Billing'|'Integrations'>('All')

const articles = ref<Article[]>([
  { id:'a1', title:'Getting Started with Dashboard', category:'Getting Started', content:'# Welcome\n\nThis guide helps you onboard quickly. Steps:\n1. Invite team\n2. Configure RBAC\n3. Connect integrations' },
  { id:'a2', title:'Two-Factor Authentication', category:'Security', content:'## 2FA\n\nEnable in **Security Settings**. Keep backup codes in a safe place.' },
  { id:'a3', title:'Invoices & Taxes', category:'Billing', content:'## Invoices\n\nAll invoices available under *Billing*. Export as PDF or CSV.' },
  { id:'a4', title:'Slack Integration', category:'Integrations', content:'## Slack\n\nConnect via OAuth. Scopes required: `chat:write`, `incoming-webhook`.' },
])

const cats = ['All','Getting Started','Security','Billing','Integrations'] as const

const filtered = computed<Article[]>(() => {
  const q = query.value.toLowerCase()
  return articles.value.filter(a => {
    const cOk = category.value === 'All' || a.category === category.value
    const qOk = [a.title, a.content].some(v => v.toLowerCase().includes(q))
    return cOk && qOk
  })
})

const active = ref<Article | null>(articles.value[0] ?? null)
const openArticle = (a: Article): void => { active.value = a }
</script>

<template>
  <section class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400">
        Knowledge Base
      </h1>
      <input v-model="query" class="input-dark w-64" placeholder="Search docs…" />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Categories -->
      <div class="p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#8B5CF6_0%,#22D3EE_55%,#EC4899_100%)] animate-rotate-gradient">
        <div class="rounded-2xl bg-[rgba(15,17,23,0.94)] border border-white/10 p-5">
          <h3 class="text-white font-semibold mb-2">Categories</h3>
          <div class="flex flex-col gap-2">
            <button
                v-for="c in cats" :key="c"
                @click="category = c as any"
                class="px-3 py-2 rounded-xl text-start"
                :class="category===c ? 'bg-gradient-to-r from-indigo-500/40 to-fuchsia-500/40 text-white ring-1 ring-white/10'
                                   : 'bg-white/5 text-gray-200 hover:bg-white/10'"
            >
              {{ c }}
            </button>
          </div>
          <h3 class="text-white font-semibold mt-5 mb-2">Articles</h3>
          <div class="space-y-2 max-h-[40vh] overflow-y-auto pr-1">
            <button
                v-for="a in filtered" :key="a.id"
                class="w-full text-start px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-gray-200"
                @click="openArticle(a)"
            >
              {{ a.title }}
              <div class="text-[10px] text-gray-400">{{ a.category }}</div>
            </button>
          </div>
        </div>
      </div>

      <!-- Article -->
      <div class="lg:col-span-2 p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#22D3EE_0%,#8B5CF6_55%,#EC4899_100%)] animate-rotate-gradient">
        <div class="rounded-2xl bg-[rgba(15,17,23,0.94)] border border-white/10 p-6">
          <div v-if="active">
            <h2 class="text-white font-semibold text-xl mb-4">{{ active.title }}</h2>
            <!-- Very light Markdown-ish rendering -->
            <div class="prose prose-invert max-w-none">
              <p class="whitespace-pre-wrap text-gray-200 text-sm leading-relaxed">{{ active.content }}</p>
            </div>
          </div>
          <div v-else class="text-gray-400 text-sm">Select an article.</div>
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
