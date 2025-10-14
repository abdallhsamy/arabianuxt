<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import UiTable, { type TableColumn } from '~/components/Ui/Data/UiTable.vue'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const { t } = useI18n()

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
const roles = [t('pages.componentTable.roles.admin'), t('pages.componentTable.roles.editor'), t('pages.componentTable.roles.viewer')] as const

const rows = ref<User[]>(
    Array.from({ length: 125 }, (_, i): User => ({
      id: i + 1,
      name: `${t('pages.componentTable.labels.user')} ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: roles[i % roles.length] as User['role'],
      createdAt: new Date(Date.now() - i * 86_400_000).toISOString(),
      usage: Math.round(Math.random() * 100),
    }))
)

/* ------------------ Columns ------------------ */
const cols = ref<TableColumn<User>[]>([
  { key: 'name', header: t('pages.componentTable.headers.name'), sortable: true, filter: { type: 'text' } },
  { key: 'email', header: t('pages.componentTable.headers.email'), sortable: true, filter: { type: 'text' } },
  {
    key: 'role',
    header: t('pages.componentTable.headers.role'),
    sortable: true,
    filter: {
      type: 'select',
      options: roles.map(r => ({ label: r, value: r })),
    },
  },
  { key: 'usage', header: t('pages.componentTable.headers.usage'), sortable: true, filter: { type: 'range' } },
  {
    key: 'createdAt',
    header: t('pages.componentTable.headers.created'),
    sortable: true,
    accessor: (u: User) =>
        new Date(u.createdAt).toLocaleDateString(undefined, {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
  },
])

/* ------------------ Table state ------------------ */
const page = ref(1)
const pageSize = ref(10)
const selected = ref<Array<string | number>>([])

/* ------------------ Persistence helpers ------------------ */
const LS_KEY_ORDER = 'ui-table-order'
const LS_KEY_WIDTHS = 'ui-table-widths'

const persistedOrder = ref<string[] | null>(null)
const persistedWidths = ref<Record<string, number> | null>(null)

/* Restore saved settings */
onMounted(() => {
  try {
    const order = localStorage.getItem(LS_KEY_ORDER)
    const widths = localStorage.getItem(LS_KEY_WIDTHS)
    if (order) persistedOrder.value = JSON.parse(order)
    if (widths) persistedWidths.value = JSON.parse(widths)
  } catch {
    /* ignore corrupted JSON */
  }
})

/* Event handlers */
const onSelectionChange = (keys: Array<string | number>) => {
  selected.value = keys
}

const onColumnOrderChange = (order: string[]): void => {
  localStorage.setItem(LS_KEY_ORDER, JSON.stringify(order))
  persistedOrder.value = order
}

const onColumnWidthChange = (widths: Record<string, number>): void => {
  localStorage.setItem(LS_KEY_WIDTHS, JSON.stringify(widths))
  persistedWidths.value = widths
}

/* Watchers to re-sync on change (if another tab modifies LS) */
watch(persistedOrder, v => {
  if (v) localStorage.setItem(LS_KEY_ORDER, JSON.stringify(v))
})
watch(persistedWidths, v => {
  if (v) localStorage.setItem(LS_KEY_WIDTHS, JSON.stringify(v))
})
</script>

<template>
  <section class="p-8 space-y-6">
    <h1 class="text-2xl font-bold text-gray-100">
      {{ t('pages.componentTable.title') }}
    </h1>

    <UiTable
        :rows="rows"
        :columns="cols as any"
    v-model:page="page"
    v-model:pageSize="pageSize"
    :selectable="true"
    :stickyHeader="true"
    :defaultSort="{ key: 'name', dir: 'asc' }"
    :keyOrder="persistedOrder ?? undefined"
    :widths="persistedWidths ?? undefined"
    @selection-change="onSelectionChange"
    @column-order-change="onColumnOrderChange"
    @column-width-change="onColumnWidthChange"
    >
    <template #cell:role="{ value }">
        <span
            class="inline-flex items-center rounded-full border border-white/10 px-2 py-0.5 text-xs"
            :class="{
            'bg-rose-500/20 text-rose-200': value === 'Admin',
            'bg-amber-500/20 text-amber-200': value === 'Editor',
            'bg-emerald-500/20 text-emerald-200': value === 'Viewer',
          }"
        >
          {{ value }}
        </span>
    </template>

    <template #empty>
      <div class="py-6 text-gray-400">{{ t('pages.componentTable.emptyState') }}</div>
    </template>
    </UiTable>

    <div class="text-sm text-gray-400">
      {{ t('pages.componentTable.selectedRows') }}: {{ selected.join(', ') || t('pages.componentTable.none') }}
    </div>
  </section>
</template>

<style scoped>
@reference "tailwindcss";
section {
  @apply max-w-7xl mx-auto;
}
</style>
