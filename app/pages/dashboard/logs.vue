<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import GradientCard from '~/components/Ui/Common/GradientCard.vue'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const { t } = useI18n()

const logs = ref<string[]>([])
const search = ref('')
const running = ref(true)
let interval: NodeJS.Timeout | null = null

const addLog = (msg:string)=>logs.value.unshift(`[${new Date().toLocaleTimeString()}] ${msg}`)

onMounted(()=>{
  const messages=[
    t('pages.logs.messages.authOk'),
    t('pages.logs.messages.queryExecuted'),
    t('pages.logs.messages.cacheMiss'),
    t('pages.logs.messages.jobStarted'),
    t('pages.logs.messages.userLogin'),
    t('pages.logs.messages.paymentSucceeded')
  ]
  interval=setInterval(()=>{
    if(!running.value)return
    addLog(messages[Math.floor(Math.random()*messages.length)])
    if(logs.value.length>200)logs.value.splice(200)
  },1000)
})
onUnmounted(()=>{ if(interval) clearInterval(interval) })
</script>

<template>
  <section class="space-y-8">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400">
        {{ t('pages.logs.title') }}
      </h1>
      <button class="px-4 py-1.5 rounded-xl text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400"
              @click="running=!running">
        {{ running ? t('pages.logs.pause') : t('pages.logs.resume') }}
      </button>
    </div>

    <GradientCard>
      <input v-model="search" class="input-dark mb-3 w-full" :placeholder="t('pages.logs.searchPlaceholder')" />
      <div class="h-[50vh] overflow-y-auto font-mono text-xs text-gray-300 bg-black/30 rounded-xl p-3 leading-relaxed">
        <template v-for="l in logs" :key="l">
          <div v-if="!search || l.toLowerCase().includes(search.toLowerCase())">{{ l }}</div>
        </template>
      </div>
    </GradientCard>
  </section>
</template>

<style scoped>
.input-dark{background-color:rgba(25,27,33,.95);border:1px solid rgba(255,255,255,.08);color:white;border-radius:.75rem;padding:.6rem .9rem}
.input-dark:focus{outline:none;border-color:rgba(236,72,153,.4);box-shadow:0 0 0 2px rgba(236,72,153,.2)}
</style>
