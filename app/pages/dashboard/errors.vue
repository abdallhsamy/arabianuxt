<script setup lang="ts">
import { ref } from 'vue'
import GradientCard from '~/components/Ui/Common/GradientCard.vue'

const { t } = useI18n()

type Err = { id:string; time:string; message:string; severity:'critical'|'warning'|'info'; trace:string; open?:boolean }
const errors = ref<Err[]>([
  { id:'E-2025-01', time:'2025-10-08 11:22', message:'Unhandled promise rejection in payments.js',
    severity:'critical', trace:'TypeError: Cannot read property "amount" of undefined\n    at /srv/payments.js:44:12' },
  { id:'E-2025-02', time:'2025-10-08 09:10', message:'Cache miss threshold exceeded', severity:'warning',
    trace:'Warning: Cache utilization > 85% at RedisCluster node-2' },
  { id:'E-2025-03', time:'2025-10-07 22:01', message:'Background job completed', severity:'info',
    trace:'Job #493 completed successfully in 3.2 s' },
])
const toggle = (e:Err) => (e.open = !e.open)
</script>

<template>
  <section class="space-y-8">
    <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400">
      {{ t('pages.errors.title') }}
    </h1>

    <GradientCard>
      <ul class="divide-y divide-white/10">
        <li v-for="e in errors" :key="e.id" class="py-3">
          <div class="flex justify-between items-start cursor-pointer" @click="toggle(e)">
            <div>
              <p class="text-white text-sm">{{ e.message }}</p>
              <p class="text-xs text-gray-400 mt-1">{{ e.time }}</p>
            </div>
            <span class="px-2 py-1 rounded-full text-xs capitalize"
                  :class="e.severity==='critical'?'bg-rose-500/10 text-rose-400 border border-rose-400/30'
                          :e.severity==='warning'?'bg-amber-400/10 text-amber-300 border border-amber-300/30'
                          :'bg-cyan-500/10 text-cyan-300 border border-cyan-300/30'">
              {{ t(`pages.errors.severities.${e.severity}`) }}
            </span>
          </div>
          <transition name="fade">
            <pre v-if="e.open"
                 class="mt-3 text-xs text-gray-300 bg-black/30 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap">
{{ e.trace }}
            </pre>
          </transition>
        </li>
      </ul>
    </GradientCard>
  </section>
</template>

<style scoped>
.fade-enter-active,.fade-leave-active{transition:all .3s ease}
.fade-enter-from,.fade-leave-to{opacity:0;transform:translateY(-4px)}
</style>
