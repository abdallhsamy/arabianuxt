<script setup lang="ts">
import { ref, computed } from 'vue'
import GradientCard from '~/components/Ui/Common/GradientCard.vue'
import DataTable from '~/components/Ui/Common/DataTable.vue'
import TicketModal from '~/components/Ui/Support/TicketModal.vue'
import { AlertCircle, CheckCircle2, Clock } from 'lucide-vue-next'

type Ticket = {
  id: string
  subject: string
  status: 'open'|'pending'|'closed'
  priority: 'low'|'medium'|'high'
  createdAt: string
}

const tickets = ref<Ticket[]>([
  { id:'T-1042', subject:'Billing discrepancy on last invoice', status:'open',    priority:'high',   createdAt:'2025-10-05' },
  { id:'T-1039', subject:'Can’t connect GitHub integration',    status:'pending', priority:'medium', createdAt:'2025-10-03' },
  { id:'T-1033', subject:'Feature request: SSO SAML',           status:'closed',  priority:'low',    createdAt:'2025-09-28' },
])

const status = ref<'all'|'open'|'pending'|'closed'>('all')
const priority = ref<'all'|'low'|'medium'|'high'>('all')
const query = ref('')

const headers = [
  { key:'id', label:'ID' },
  { key:'subject', label:'Subject' },
  { key:'status', label:'Status' },
  { key:'priority', label:'Priority' },
  { key:'createdAt', label:'Created', class:'text-right' },
]

const filtered = computed<Ticket[]>(() => {
  const q = query.value.toLowerCase()
  return tickets.value.filter(t => {
    const sOk = status.value === 'all' || t.status === status.value
    const pOk = priority.value === 'all' || t.priority === priority.value
    const qOk = t.subject.toLowerCase().includes(q) || t.id.toLowerCase().includes(q)
    return sOk && pOk && qOk
  })
})

const modalOpen = ref(false)
const activeTicketId = ref<string>('')

const openTicket = (id: string): void => {
  activeTicketId.value = id
  modalOpen.value = true
}

const badgeStatus = (s: Ticket['status']): string => ({
  open: 'bg-rose-500/10 text-rose-400 border border-rose-400/30',
  pending: 'bg-amber-400/10 text-amber-300 border border-amber-300/30',
  closed: 'bg-emerald-500/10 text-emerald-400 border border-emerald-400/30',
}[s])

const badgePriority = (p: Ticket['priority']): string => ({
  low: 'bg-cyan-500/10 text-cyan-300 border border-cyan-300/30',
  medium: 'bg-indigo-500/10 text-indigo-300 border border-indigo-300/30',
  high: 'bg-rose-500/10 text-rose-400 border border-rose-400/30',
}[p])
</script>

<template>
  <section class="space-y-8">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400">
        Support Tickets
      </h1>
      <div class="flex gap-2">
        <button
            v-for="s in ['all','open','pending','closed']"
            :key="s"
            @click="status = s as any"
            class="px-3 py-1.5 rounded-xl text-sm capitalize"
            :class="status===s ? 'bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/15'"
        >
          {{ s }}
        </button>
      </div>
    </div>

    <GradientCard>
      <div class="flex flex-col md:flex-row gap-3 mb-4">
        <input v-model="query" class="input-dark md:flex-1" placeholder="Search by subject or ID…" />
        <div class="flex gap-2">
          <button
              v-for="p in ['all','low','medium','high']"
              :key="p"
              @click="priority = p as any"
              class="px-3 py-1.5 rounded-xl text-sm capitalize"
              :class="priority===p ? 'bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/15'"
          >
            {{ p }}
          </button>
        </div>
      </div>

      <DataTable :headers="headers" :rows="filtered" row-key="id">
        <template #cell:subject="{ row }">
          <button class="text-left text-white hover:underline" @click="openTicket(row.id as string)">
            {{ row.subject }}
          </button>
        </template>

        <template #cell:status="{ row }">
          <span class="text-xs px-2 py-1 rounded-full" :class="badgeStatus(row.status)">{{ row.status }}</span>
        </template>

        <template #cell:priority="{ row }">
          <span class="text-xs px-2 py-1 rounded-full" :class="badgePriority(row.priority)">{{ row.priority }}</span>
        </template>

        <template #cell:createdAt="{ row }">
          <div class="text-right text-gray-300 flex items-center gap-1 justify-end">
            <Clock class="w-4 h-4 text-indigo-300" /> {{ row.createdAt }}
          </div>
        </template>
      </DataTable>
    </GradientCard>

    <!-- Ticket Chat Modal -->
    <TicketModal
        v-model:open="modalOpen"
        :ticket-id="activeTicketId"
        :subject="(filtered.find(t=>t.id===activeTicketId)?.subject ?? 'Ticket')"
    />
  </section>
</template>

<style scoped>
.input-dark { background-color: rgba(25,27,33,0.95); border:1px solid rgba(255,255,255,0.08); color:white; border-radius:.75rem; padding:.6rem .9rem; transition:all .25s ease; }
.input-dark:focus { outline:none; border-color:rgba(236,72,153,.4); box-shadow:0 0 0 2px rgba(236,72,153,.2); }
</style>
