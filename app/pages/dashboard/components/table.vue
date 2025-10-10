<script setup lang="ts">
import { ref } from 'vue'
import UiTable, { type TableColumn } from '~/components/Ui/Data/UiTable.vue'

/* ------------------ Data model ------------------ */
interface User {
  id: number
  name: string
  email: string
  role: 'Admin' | 'Editor' | 'Viewer'
  createdAt: string
  usage: number
}

/* ------------------ Fake data ------------------ */
const rows = ref<User[]>(
    Array.from({ length: 125 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: (['Admin', 'Editor', 'Viewer'] as const)[i % 3],
      createdAt: new Date(Date.now() - i * 86400000).toISOString(),
      usage: Math.round(Math.random() * 100),
    }))
)

/* ------------------ Column definitions ------------------ */
const cols: TableColumn<User>[] = [
  { key: 'name', header: 'Name', sortable: true, searchable: true, width: 'w-48' },
  { key: 'email', header: 'Email', sortable: true, searchable: true, width: 'w-60' },
  { key: 'role', header: 'Role', sortable: true, searchable: true, width: 'w-28', align: 'center' },
  {
    key: 'usage',
    header: 'Usage %',
    sortable: true,
    searchable: false,
    align: 'right',
    accessor: (u) => `${u.usage}%`,
  },
  {
    key: 'createdAt',
    header: 'Created',
    sortable: true,
    searchable: false,
    accessor: (u) => new Date(u.createdAt).toLocaleDateString(),
  },
]

/* ------------------ Table state ------------------ */
const page = ref(1)
const pageSize = ref(10)
const selected = ref<Array<string | number>>([])

const onSelectionChange = (keys: Array<string | number>) => {
  selected.value = keys
}
</script>

<template>
  <section class="p-8 space-y-6">
    <h1 class="text-2xl font-bold text-gray-100">📊 UiTable – Full Demo</h1>

    <UiTable
        :rows="rows"
        :columns="cols"
        v-model:page="page"
        v-model:pageSize="pageSize"
        :selectable="true"
        :stickyHeader="true"
        :defaultSort="{ key: 'name', dir: 'asc' }"
        @selection-change="onSelectionChange"
    >
      <!-- Custom cell slot -->
      <template #cell:role="{ value }">
        <span
            class="inline-flex items-center rounded-full border border-white/10 px-2 py-0.5 text-xs"
            :class="{
            'bg-rose-500/20 text-rose-200': value === 'Admin',
            'bg-amber-500/20 text-amber-200': value === 'Editor',
            'bg-emerald-500/20 text-emerald-200': value === 'Viewer'
          }"
        >
          {{ value }}
        </span>
      </template>

      <!-- Optional: override empty slot -->
      <template #empty>
        <div class="py-6 text-gray-400">No users found.</div>
      </template>
    </UiTable>

    <div class="text-sm text-gray-400">
      Selected rows: {{ selected.join(', ') || 'None' }}
    </div>
  </section>
</template>

<style scoped>
@reference "tailwindcss";
section {
  @apply max-w-7xl mx-auto;
}
</style>
