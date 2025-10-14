<script setup lang="ts">
import { ref, computed } from 'vue'
import GradientCard from '~/components/Ui/Common/GradientCard.vue'
import DataTable from '~/components/Ui/Common/DataTable.vue'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const { t } = useI18n()

type Log = {
  id: string
  time: string
  actor: string
  action: string
  target: string
  severity: 'info'|'warning'|'critical'
}

const query = ref('')
const severity = ref<'all'|'info'|'warning'|'critical'>('all')

const logs = ref<Log[]>([
  { id:'1', time:'2025-10-08 10:01', actor:'abdallah', action:'updated permissions', target:'team', severity:'info' },
  { id:'2', time:'2025-10-08 09:13', actor:'system',   action:'blocked ip',         target:'10.12.45.201', severity:'critical' },
  { id:'3', time:'2025-10-07 20:05', actor:'mariam',   action:'paid invoice',       target:'INV-2025-0041', severity:'info' },
  { id:'4', time:'2025-10-07 14:44', actor:'system',   action:'throttled api',      target:'/v1/keys', severity:'warning' },
])

const headers = [
  { key:'time', label: t('pages.auditLogs.tableHeaders.time') },
  { key:'actor', label: t('pages.auditLogs.tableHeaders.actor') },
  { key:'action', label: t('pages.auditLogs.tableHeaders.action') },
  { key:'target', label: t('pages.auditLogs.tableHeaders.target') },
  { key:'severity', label: t('pages.auditLogs.tableHeaders.severity'), class:'text-right' },
]

const filtered = computed<Log[]>(() => {
  const q = query.value.toLowerCase()
  return logs.value.filter(l => {
    const sevOk = severity.value === 'all' || l.severity === severity.value
    const qOk = [l.actor, l.action, l.target].some(v => v.toLowerCase().includes(q))
    return sevOk && qOk
  })
})

const badge = (s: Log['severity']): string => ({
  info: 'bg-cyan-500/10 text-cyan-300 border border-cyan-300/30',
  warning: 'bg-amber-400/10 text-amber-300 border border-amber-300/30',
  critical: 'bg-rose-500/10 text-rose-400 border border-rose-400/30',
}[s])

const exportCsv = (): void => {
  const rows = [['time','actor','action','target','severity'], ...filtered.value.map(l => [l.time,l.actor,l.action,l.target,l.severity])]
  const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'audit-logs.csv'
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <section class="space-y-8">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400">
        {{ t('pages.auditLogs.title') }}
      </h1>
      <button class="px-4 py-2 rounded-xl text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 hover:brightness-110 font-semibold" @click="exportCsv">
        {{ t('pages.auditLogs.exportCsv') }}
      </button>
    </div>

    <GradientCard>
      <div class="flex flex-col md:flex-row gap-3 mb-4">
        <input v-model="query" class="input-dark md:flex-1" :placeholder="t('pages.auditLogs.searchPlaceholder')" />
        <div class="flex gap-2">
          <button
              v-for="s in ['all','info','warning','critical']"
              :key="s"
              @click="severity = s as any"
              class="px-3 py-1.5 rounded-xl text-sm capitalize"
              :class="severity===s ? 'bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/15'"
          >
            {{ t(`pages.auditLogs.severities.${s}`) }}
          </button>
        </div>
      </div>

      <DataTable :headers="headers" :rows="filtered" row-key="id">
        <template #cell:severity="{ row }">
          <div class="text-right">
            <span class="text-xs px-2 py-1 rounded-full" :class="badge(row.severity as any)">{{ t(`pages.auditLogs.severities.${row.severity}`) }}</span>
          </div>
        </template>
      </DataTable>
    </GradientCard>
  </section>
</template>

<style scoped>
.input-dark { background-color: rgba(25,27,33,0.95); border:1px solid rgba(255,255,255,0.08); color:white; border-radius:.75rem; padding:.6rem .9rem; transition:all .25s ease; }
.input-dark:focus { outline:none; border-color:rgba(236,72,153,.4); box-shadow:0 0 0 2px rgba(236,72,153,.2); }
</style>
