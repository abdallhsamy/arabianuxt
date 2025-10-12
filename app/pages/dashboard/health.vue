<script setup lang="ts">
import MetricMini from '~/components/Ui/Charts/MetricMini.vue'
import GradientCard from '~/components/Ui/Common/GradientCard.vue'
import { ref } from 'vue'

const { t } = useI18n()

type Service = { name: string; status: 'up'|'down'|'degraded'; latency: string }
const services = ref<Service[]>([
  { name: t('pages.health.services.apiGateway'), status:'up', latency:'120 ms' },
  { name: t('pages.health.services.dbCluster'),  status:'degraded', latency:'340 ms' },
  { name: t('pages.health.services.authServer'), status:'up', latency:'90 ms' },
  { name: t('pages.health.services.emailQueue'), status:'down', latency:'–' },
])
</script>

<template>
  <section class="space-y-8">
    <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400">
      {{ t('pages.health.title') }}
    </h1>

    <GradientCard>
      <div class="flex flex-wrap justify-center gap-8">
        <MetricMini :label="t('pages.health.cpuUsage')" color="rgba(236,72,153,0.8)" />
        <MetricMini :label="t('pages.health.memoryUsage')" color="rgba(139,92,246,0.8)" />
        <MetricMini :label="t('pages.health.diskIo')" color="rgba(34,197,94,0.8)" />
        <MetricMini :label="t('pages.health.network')" color="rgba(56,189,248,0.8)" />
      </div>
    </GradientCard>

    <GradientCard>
      <h2 class="text-white font-semibold mb-4">{{ t('pages.health.serviceStatus') }}</h2>
      <ul class="divide-y divide-white/10">
        <li v-for="s in services" :key="s.name" class="flex items-center justify-between py-3">
          <span class="text-gray-200">{{ s.name }}</span>
          <div class="flex items-center gap-3">
            <span class="text-sm text-gray-400">{{ s.latency }}</span>
            <span class="px-3 py-1 text-xs rounded-full capitalize"
                  :class="s.status==='up'?'bg-emerald-500/10 text-emerald-400 border border-emerald-400/30'
                          :s.status==='down'?'bg-rose-500/10 text-rose-400 border border-rose-400/30'
                          :'bg-amber-400/10 text-amber-300 border border-amber-300/30'">
              {{ t(`pages.health.statuses.${s.status}`) }}
            </span>
          </div>
        </li>
      </ul>
    </GradientCard>
  </section>
</template>
