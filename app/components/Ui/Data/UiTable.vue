<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue'

type SortDir = 'asc' | 'desc'

export type FieldAccessor<T> = (row: T) => unknown

export interface TableColumn<T = Record<string, any>> {
  key: string
  header: string
  accessor?: keyof T | FieldAccessor<T>
  sortable?: boolean
  searchable?: boolean
  width?: string
  align?: 'left' | 'center' | 'right'
  hidden?: boolean
  class?: string
  filter?: {
    type: 'text' | 'select' | 'range'
    options?: Array<{ label: string; value: any }>
  }
}

export interface UiTableProps<T = Record<string, any>> {
  rows: T[]
  columns: TableColumn<T>[]
  loading?: boolean
  defaultSort?: { key: string; dir: SortDir } | null
  multiSort?: boolean
  serverMode?: boolean
  page?: number
  pageSize?: number
  total?: number
  pageSizes?: number[]
  searchable?: boolean
  searchPlaceholder?: string
  debounceMs?: number
  selectable?: boolean
  rowKey?: (row: T) => string | number
  dense?: boolean
  rounded?: boolean
  stickyHeader?: boolean
}

const props = withDefaults(defineProps<UiTableProps>(), {
  rows: () => [],
  columns: () => [],
  loading: false,
  defaultSort: null,
  multiSort: false,
  serverMode: false,
  page: 1,
  pageSize: 10,
  total: 0,
  pageSizes: () => [10, 25, 50],
  searchable: true,
  searchPlaceholder: 'Search…',
  debounceMs: 200,
  selectable: true,
  rowKey: (r: any) => r.id ?? JSON.stringify(r),
  dense: false,
  rounded: true,
  stickyHeader: true,
})

const emit = defineEmits<{
  (e: 'update:page', v: number): void
  (e: 'update:pageSize', v: number): void
  (e: 'selection-change', v: Array<string | number>): void
  (e: 'sort-change', v: { key: string; dir: SortDir }[]): void
  (e: 'filter-change', v: Record<string, any>): void
}>()

/* ------------------ State ------------------ */
const search = ref('')
const internalPage = ref(props.page)
const internalPageSize = ref(props.pageSize)
const sorts = ref<{ key: string; dir: SortDir }[]>(props.defaultSort ? [props.defaultSort] : [])
const visibleCols = ref<string[]>(props.columns.filter(c => !c.hidden).map(c => c.key))
const selected = ref<Set<string | number>>(new Set())
const filters = ref<Record<string, any>>({})
const filterOpenKey = ref<string | null>(null)

/* ------------------ Helpers ------------------ */
const normalize = (v: unknown): string => (v == null ? '' : String(v))
const getCell = <T,>(row: T, col: TableColumn<T>): unknown =>
    typeof col.accessor === 'function' ? col.accessor(row) : (row as any)[col.accessor ?? col.key]

const filteredRows = computed(() => {
  if (props.serverMode) return props.rows
  let data = [...props.rows]

  // global search
  if (props.searchable && search.value.trim()) {
    const q = search.value.toLowerCase()
    data = data.filter(r =>
        props.columns.some(
            c => c.searchable !== false && normalize(getCell(r, c)).toLowerCase().includes(q)
        )
    )
  }

  // per-column filters
  for (const [k, val] of Object.entries(filters.value)) {
    if (!val) continue
    const col = props.columns.find(c => c.key === k)
    if (!col) continue

    if (col.filter?.type === 'text') {
      data = data.filter(r => normalize(getCell(r, col)).toLowerCase().includes(String(val).toLowerCase()))
    } else if (col.filter?.type === 'select') {
      data = data.filter(r => getCell(r, col) === val)
    } else if (col.filter?.type === 'range' && Array.isArray(val)) {
      const [min, max] = val
      data = data.filter(r => {
        const num = Number(getCell(r, col))
        return (isNaN(min) || num >= min) && (isNaN(max) || num <= max)
      })
    }
  }
  return data
})

const sortedRows = computed(() => {
  if (!sorts.value.length || props.serverMode) return filteredRows.value
  return [...filteredRows.value].sort((a, b) => {
    for (const s of sorts.value) {
      const col = props.columns.find(c => c.key === s.key)
      if (!col) continue
      const av = normalize(getCell(a, col))
      const bv = normalize(getCell(b, col))
      const cmp = av.localeCompare(bv, undefined, { numeric: true, sensitivity: 'base' })
      if (cmp !== 0) return s.dir === 'asc' ? cmp : -cmp
    }
    return 0
  })
})

/* ------------------ Pagination ------------------ */
const totalRows = computed(() => (props.serverMode ? props.total : sortedRows.value.length))
const pages = computed(() => Math.max(1, Math.ceil(totalRows.value / internalPageSize.value)))
const paged = computed(() => {
  const start = (internalPage.value - 1) * internalPageSize.value
  return sortedRows.value.slice(start, start + internalPageSize.value)
})

/* ------------------ Sorting ------------------ */
const nextDir = (d?: SortDir): SortDir | null => (d === 'asc' ? 'desc' : d === 'desc' ? null : 'asc')
const cycleSort = (key: string): void => {
  const i = sorts.value.findIndex(s => s.key === key)
  if (i === -1) sorts.value = [{ key, dir: 'asc' }]
  else {
    const dir = nextDir(sorts.value[i]?.dir)
    if (!dir) sorts.value.splice(i, 1)
    else sorts.value[i].dir = dir
  }
  emit('sort-change', sorts.value)
}
const sortIcon = (k: string) => {
  const s = sorts.value.find(x => x.key === k)
  return s?.dir === 'asc' ? '▲' : s?.dir === 'desc' ? '▼' : ''
}

/* ------------------ Filters ------------------ */
const toggleFilterMenu = (k: string): void => {
  filterOpenKey.value = filterOpenKey.value === k ? null : k
}

const updateFilter = (k: string, v: any): void => {
  filters.value[k] = v
  emit('filter-change', filters.value)
}

/* ------------------ Selection ------------------ */
const allSelected = computed(() =>
    paged.value.length > 0 && paged.value.every(r => selected.value.has(props.rowKey(r)))
)
const toggleAll = (): void => {
  const keys = paged.value.map(r => props.rowKey(r))
  const set = new Set(selected.value)
  if (allSelected.value) keys.forEach(k => set.delete(k))
  else keys.forEach(k => set.add(k))
  selected.value = set
  emit('selection-change', Array.from(set))
}
const toggleRow = (r: any): void => {
  const key = props.rowKey(r)
  const set = new Set(selected.value)
  if (set.has(key)) set.delete(key)
  else set.add(key)
  selected.value = set
  emit('selection-change', Array.from(set))
}
</script>

<template>
  <div class="w-full">
    <!-- Global search -->
    <div v-if="props.searchable" class="mb-3">
      <input
          v-model="search"
          type="text"
          :placeholder="props.searchPlaceholder"
          class="rounded-lg bg-white/5 border border-white/10 text-sm text-gray-100 px-3 py-2 outline-none focus:ring-2 ring-fuchsia-500/30 w-64"
      />
    </div>

    <!-- Table -->
    <div class="overflow-x-auto border border-white/10 rounded-2xl bg-white/5 backdrop-blur-xl">
      <table class="w-full text-sm text-gray-100">
        <thead class="bg-black/50 backdrop-blur-md">
        <tr>
          <th v-if="props.selectable" class="px-3 py-3">
            <input type="checkbox" :checked="allSelected" @change="toggleAll" />
          </th>
          <th
              v-for="col in props.columns"
              v-show="visibleCols.includes(col.key)"
              :key="col.key"
              class="px-3 py-3 text-left"
          >
            <div class="flex items-center gap-1">
              <button
                  v-if="col.sortable"
                  class="inline-flex items-center gap-1 hover:text-fuchsia-300"
                  @click="cycleSort(col.key)"
              >
                {{ col.header }} <span class="text-xs">{{ sortIcon(col.key) }}</span>
              </button>
              <span v-else>{{ col.header }}</span>

              <button
                  v-if="col.filter"
                  class="ml-1 text-xs text-gray-400 hover:text-fuchsia-300"
                  @click.stop="toggleFilterMenu(col.key)"
              >
                ⛃
              </button>
            </div>

            <!-- Filter menu -->
            <div
                v-if="filterOpenKey === col.key"
                class="absolute mt-1 z-50 rounded-lg border border-white/10 bg-black/70 p-2 text-xs"
            >
              <div v-if="col.filter?.type === 'text'">
                <input
                    type="text"
                    v-model="filters[col.key]"
                    class="bg-white/5 border border-white/10 rounded-md px-2 py-1 text-gray-100 outline-none"
                    @input="updateFilter(col.key, filters[col.key])"
                    placeholder="Filter..."
                />
              </div>
              <div v-else-if="col.filter?.type === 'select'">
                <select
                    v-model="filters[col.key]"
                    @change="updateFilter(col.key, filters[col.key])"
                    class="bg-white/5 border border-white/10 rounded-md px-2 py-1 text-gray-100 outline-none"
                >
                  <option value="">All</option>
                  <option v-for="opt in col.filter.options" :key="opt.value" :value="opt.value">
                    {{ opt.label }}
                  </option>
                </select>
              </div>
              <div v-else-if="col.filter?.type === 'range'" class="flex items-center gap-1">
                <input
                    type="number"
                    placeholder="Min"
                    v-model.number="filters[col.key][0]"
                    @input="updateFilter(col.key, filters[col.key])"
                    class="w-16 bg-white/5 border border-white/10 rounded-md px-2 py-1 text-gray-100 outline-none"
                />
                <span>-</span>
                <input
                    type="number"
                    placeholder="Max"
                    v-model.number="filters[col.key][1]"
                    @input="updateFilter(col.key, filters[col.key])"
                    class="w-16 bg-white/5 border border-white/10 rounded-md px-2 py-1 text-gray-100 outline-none"
                />
              </div>
            </div>
          </th>
        </tr>
        </thead>

        <tbody>
        <tr
            v-for="row in paged"
            :key="props.rowKey(row)"
            class="border-t border-white/5 hover:bg-white/10 transition"
        >
          <td v-if="props.selectable" class="px-3 py-2">
            <input type="checkbox" :checked="selected.has(props.rowKey(row))" @change="toggleRow(row)" />
          </td>
          <td
              v-for="col in props.columns"
              v-show="visibleCols.includes(col.key)"
              :key="col.key"
              class="px-3 py-2"
              :class="col.class"
          >
            <slot :name="`cell:${col.key}`" :row="row" :value="getCell(row, col)">
              {{ getCell(row, col) }}
            </slot>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Footer -->
    <div class="mt-3 flex justify-between text-xs text-gray-400">
      <div>Page {{ internalPage }} / {{ pages }} – {{ totalRows }} rows</div>
    </div>
  </div>
</template>
