<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

type SortDir = 'asc' | 'desc'
export type FieldAccessor<T> = (row: T) => unknown

export interface TableColumn<T = Record<string, any>> {
  key: string
  header: string
  accessor?: keyof T | FieldAccessor<T>
  sortable?: boolean
  searchable?: boolean
  width?: string                     // initial width utility e.g. 'w-48' (optional)
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
  pageSizes: () => [10, 25, 50, 100],
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
  (e: 'column-order-change', v: string[]): void
  (e: 'column-width-change', v: Record<string, number>): void
  (e: 'export'): void
  (e: 'search', v: string): void
}>()

/* ------------------ State ------------------ */
const search = ref('')
const internalPage = ref(props.page)
const internalPageSize = ref(props.pageSize)
const sorts = ref<{ key: string; dir: SortDir }[]>(props.defaultSort ? [props.defaultSort] : [])
const selected = ref<Set<string | number>>(new Set())
const filters = ref<Record<string, any>>({})
const filterOpenKey = ref<string | null>(null)

/* ---------- Column order & widths ---------- */
const initialOrder = props.columns.filter(c => !c.hidden).map(c => c.key)
const columnOrder = ref<string[]>([...initialOrder])

// widths in px; when undefined, auto
const columnWidths = ref<Record<string, number>>({})
const resizingKey = ref<string | null>(null)
const dragStartX = ref(0)
const dragStartW = ref(0)

const draggingKey = ref<string | null>(null)
const dragOverKey = ref<string | null>(null)

const visibleColumns = computed(() =>
    columnOrder.value
        .map(k => props.columns.find(c => c.key === k))
        .filter((c): c is TableColumn => !!c)
)

watch(() => props.page, v => { internalPage.value = v })
watch(() => props.pageSize, v => { internalPageSize.value = v })

/* ------------------ Helpers ------------------ */
const normalize = (v: unknown): string => (v == null ? '' : String(v))
const getCell = <T,>(row: T, col: TableColumn<T>): unknown =>
    typeof col.accessor === 'function' ? col.accessor(row) : (row as any)[col.accessor ?? col.key]

const debounced = <T extends (...args: any[]) => void>(fn: T, ms: number) => {
  let t: number | undefined
  return (...args: Parameters<T>) => {
    if (t) window.clearTimeout(t)
    t = window.setTimeout(() => fn(...args), ms)
  }
}

const onSearchInput = debounced((v: string) => {
  emit('search', v)
  if (!props.serverMode) internalPage.value = 1
}, props.debounceMs)

/* ------------------ Filter & Sort pipeline ------------------ */
const filteredRows = computed(() => {
  if (props.serverMode) return props.rows
  let data = [...props.rows]

  if (props.searchable && search.value.trim()) {
    const q = search.value.toLowerCase()
    data = data.filter(r =>
        visibleColumns.value.some(
            c => c.searchable !== false && normalize(getCell(r, c)).toLowerCase().includes(q)
        )
    )
  }
  for (const [k, v] of Object.entries(filters.value)) {
    if (v == null || v === '' || (Array.isArray(v) && v.every(x => x === '' || x == null))) continue
    const col = props.columns.find(c => c.key === k)
    if (!col) continue
    if (col.filter?.type === 'text') {
      data = data.filter(r => normalize(getCell(r, col)).toLowerCase().includes(String(v).toLowerCase()))
    } else if (col.filter?.type === 'select') {
      data = data.filter(r => getCell(r, col) === v)
    } else if (col.filter?.type === 'range' && Array.isArray(v)) {
      const [min, max] = v
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
  if (props.serverMode) return props.rows
  const start = (internalPage.value - 1) * internalPageSize.value
  return sortedRows.value.slice(start, start + internalPageSize.value)
})

/* ------------------ Selection ------------------ */
const allOnPageChecked = computed(() =>
    paged.value.length > 0 && paged.value.every(r => selected.value.has(props.rowKey(r)))
)
const someOnPageChecked = computed(() => {
  const n = paged.value.filter(r => selected.value.has(props.rowKey(r))).length
  return n > 0 && n < paged.value.length
})
const toggleAllCurrentPage = (): void => {
  const keys = paged.value.map(r => props.rowKey(r))
  const set = new Set(selected.value)
  if (allOnPageChecked.value) keys.forEach(k => set.delete(k))
  else keys.forEach(k => set.add(k))
  selected.value = set
  emit('selection-change', Array.from(set))
}
const toggleRow = (row: any): void => {
  const k = props.rowKey(row)
  const set = new Set(selected.value)
  if (set.has(k)) set.delete(k)
  else set.add(k)
  selected.value = set
  emit('selection-change', Array.from(set))
}

/* ------------------ Sorting ------------------ */
const nextDir = (d?: SortDir): SortDir | null => (d === 'asc' ? 'desc' : d === 'desc' ? null : 'asc')
const cycleSort = (key: string): void => {
  const i = sorts.value.findIndex(s => s.key === key)
  if (i === -1) sorts.value = [{ key, dir: 'asc' }]
  else {
    const dir = nextDir(sorts.value[i].dir)
    if (!dir) sorts.value.splice(i, 1)
    else sorts.value[i].dir = dir
  }
  emit('sort-change', sorts.value)
  if (!props.serverMode) internalPage.value = 1
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
  emit('filter-change', { ...filters.value })
}

/* ------------------ Column reorder (DnD) ------------------ */
const onHeaderDragStart = (e: DragEvent, key: string): void => {
  draggingKey.value = key
  e.dataTransfer?.setData('text/plain', key)
  e.dataTransfer?.setDragImage?.(new Image(), 0, 0)
}
const onHeaderDragOver = (e: DragEvent, overKey: string): void => {
  e.preventDefault()
  dragOverKey.value = overKey
}
const onHeaderDrop = (e: DragEvent, overKey: string): void => {
  e.preventDefault()
  const from = draggingKey.value
  if (!from || from === overKey) { draggingKey.value = null; dragOverKey.value = null; return }
  const order = [...columnOrder.value]
  const fromIdx = order.indexOf(from)
  const toIdx = order.indexOf(overKey)
  order.splice(fromIdx, 1)
  order.splice(toIdx, 0, from)
  columnOrder.value = order
  draggingKey.value = null
  dragOverKey.value = null
  emit('column-order-change', [...order])
}

/* ------------------ Column resize ------------------ */
const onResizerDown = (e: MouseEvent, key: string): void => {
  e.preventDefault()
  resizingKey.value = key
  dragStartX.value = e.clientX
  const th = (e.currentTarget as HTMLElement).closest('th') as HTMLElement | null
  dragStartW.value = th ? th.getBoundingClientRect().width : (columnWidths.value[key] ?? 160)
  document.addEventListener('mousemove', onResizerMove)
  document.addEventListener('mouseup', onResizerUp)
  document.body.style.userSelect = 'none'
}
const onResizerMove = (e: MouseEvent): void => {
  if (!resizingKey.value) return
  const delta = e.clientX - dragStartX.value
  const w = Math.max(80, Math.round(dragStartW.value + delta))
  columnWidths.value = { ...columnWidths.value, [resizingKey.value]: w }
}
const onResizerUp = (): void => {
  if (resizingKey.value) {
    emit('column-width-change', { ...columnWidths.value })
  }
  resizingKey.value = null
  document.removeEventListener('mousemove', onResizerMove)
  document.removeEventListener('mouseup', onResizerUp)
  document.body.style.userSelect = ''
}
onBeforeUnmount(() => {
  document.removeEventListener('mousemove', onResizerMove)
  document.removeEventListener('mouseup', onResizerUp)
})

/* ------------------ Export CSV ------------------ */
const toCSV = (): void => {
  const cols = visibleColumns.value
  const header = cols.map(c => `"${c.header.replace(/"/g, '""')}"`).join(',')
  const rows = (props.serverMode ? props.rows : sortedRows.value).map(row => {
    const vals = cols.map(c => `"${normalize(getCell(row as any, c)).replace(/"/g, '""')}"`)
    return vals.join(',')
  })
  const csv = [header, ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'table.csv'
  a.click()
  URL.revokeObjectURL(url)
  emit('export')
}
</script>

<template>
  <div class="w-full">
    <!-- Toolbar -->
    <div class="mb-3 flex flex-wrap items-center gap-2">
      <div v-if="props.searchable" class="flex items-center gap-2">
        <input
            v-model="search"
            type="text"
            :placeholder="props.searchPlaceholder"
            class="rounded-lg bg-white/5 border border-white/10 text-sm text-gray-100 px-3 py-2 outline-none focus:ring-2 ring-fuchsia-500/30"
            @input="onSearchInput(search)"
        />
      </div>

      <div class="ms-auto flex items-center gap-2">
        <!-- Columns menu -->
        <details class="relative">
          <summary class="list-none select-none cursor-pointer rounded-lg border border-white/10 bg-white/5 text-gray-100 text-sm px-3 py-2">
            Columns
          </summary>
          <div class="absolute right-0 mt-2 w-56 rounded-xl border border-white/10 bg-black/70 backdrop-blur-xl p-2 shadow-2xl z-10">
            <label
                v-for="col in props.columns"
                :key="col.key"
                class="flex items-center gap-2 text-sm text-gray-100 px-2 py-1 rounded hover:bg-white/10"
            >
              <input
                  type="checkbox"
                  :checked="columnOrder.includes(col.key)"
                  @change="
                  $event.target instanceof HTMLInputElement && $event.target.checked
                    ? columnOrder = [...columnOrder, col.key].filter((v,i,a)=>a.indexOf(v)===i)
                    : columnOrder = columnOrder.filter(k => k !== col.key);
                  $emit('column-order-change', [...columnOrder])
                "
              />
              <span class="truncate">{{ col.header }}</span>
            </label>
          </div>
        </details>

        <button
            type="button"
            class="rounded-lg border border-white/10 bg-white/5 text-gray-100 text-sm px-3 py-2 hover:bg-white/10"
            @click="toCSV"
        >
          Export CSV
        </button>
      </div>
    </div>

    <!-- Table container -->
    <div class="relative overflow-x-auto border border-white/10 bg-white/5 backdrop-blur-xl" :class="props.rounded ? 'rounded-2xl' : ''">
      <table class="w-full text-sm text-gray-100">
        <thead :class="[props.stickyHeader ? 'sticky top-0 z-10' : '', 'bg-black/50 backdrop-blur-md']">
        <tr>
          <th v-if="props.selectable" scope="col" class="px-3 py-3 w-10">
            <input
                type="checkbox"
                :checked="allOnPageChecked"
                :indeterminate.prop="someOnPageChecked"
                @change="toggleAllCurrentPage"
                aria-label="Select all on page"
            />
          </th>

          <!-- Visible columns in current order -->
          <th
              v-for="col in visibleColumns"
              :key="col.key"
              scope="col"
              class="px-0 py-0 font-semibold text-gray-200 relative"
              :style="columnWidths[col.key] ? { width: columnWidths[col.key] + 'px', minWidth: columnWidths[col.key] + 'px' } : undefined"
              draggable="true"
              @dragstart="onHeaderDragStart($event, col.key)"
              @dragover="onHeaderDragOver($event, col.key)"
              @drop="onHeaderDrop($event, col.key)"
          >
            <div
                class="px-3 py-3 flex items-center gap-2"
                :class="[
                  col.align === 'center' ? 'justify-center text-center' :
                  col.align === 'right' ? 'justify-end text-right' : 'justify-start text-left'
                ]"
            >
              <button
                  v-if="col.sortable"
                  class="inline-flex items-center gap-1 hover:text-fuchsia-300"
                  @click="cycleSort(col.key)"
              >
                <span>{{ col.header }}</span>
                <span class="text-xs opacity-80">{{ sortIcon(col.key) }}</span>
              </button>
              <span v-else>{{ col.header }}</span>

              <!-- Filter trigger -->
              <button
                  v-if="col.filter"
                  class="ms-1 text-xs text-gray-400 hover:text-fuchsia-300"
                  @click.stop="toggleFilterMenu(col.key)"
                  aria-label="Open filter"
              >
                ⛃
              </button>
            </div>

            <!-- Drag over indicator -->
            <div
                v-if="dragOverKey === col.key && draggingKey"
                class="absolute inset-y-0 left-0 w-1 bg-fuchsia-500/50"
            />

            <!-- Filter popover -->
            <div
                v-if="filterOpenKey === col.key"
                class="absolute mt-1 z-50 rounded-lg border border-white/10 bg-black/70 p-2 text-xs shadow-2xl"
            >
              <div v-if="col.filter?.type === 'text'">
                <input
                    type="text"
                    :value="filters[col.key] ?? ''"
                    @input="updateFilter(col.key, ($event.target as HTMLInputElement).value)"
                    class="bg-white/5 border border-white/10 rounded-md px-2 py-1 text-gray-100 outline-none"
                    placeholder="Filter..."
                />
              </div>
              <div v-else-if="col.filter?.type === 'select'">
                <select
                    :value="filters[col.key] ?? ''"
                    @change="updateFilter(col.key, ($event.target as HTMLSelectElement).value)"
                    class="bg-white/5 border border-white/10 rounded-md px-2 py-1 text-gray-100 outline-none"
                >
                  <option value="">All</option>
                  <option v-for="opt in col.filter.options" :key="String(opt.value)" :value="opt.value">
                    {{ opt.label }}
                  </option>
                </select>
              </div>
              <div v-else-if="col.filter?.type === 'range'" class="flex items-center gap-1">
                <input
                    type="number"
                    :value="(filters[col.key]?.[0] ?? '')"
                    @input="
                      updateFilter(col.key, [
                        Number(($event.target as HTMLInputElement).value),
                        filters[col.key]?.[1] ?? ''
                      ])
                    "
                    placeholder="Min"
                    class="w-16 bg-white/5 border border-white/10 rounded-md px-2 py-1 text-gray-100 outline-none"
                />
                <span>-</span>
                <input
                    type="number"
                    :value="(filters[col.key]?.[1] ?? '')"
                    @input="
                      updateFilter(col.key, [
                        filters[col.key]?.[0] ?? '',
                        Number(($event.target as HTMLInputElement).value)
                      ])
                    "
                    placeholder="Max"
                    class="w-16 bg-white/5 border border-white/10 rounded-md px-2 py-1 text-gray-100 outline-none"
                />
              </div>
            </div>

            <!-- Resize handle -->
            <span
                class="absolute top-0 right-0 h-full w-1.5 cursor-col-resize select-none"
                @mousedown="onResizerDown($event, col.key)"
                aria-hidden="true"
            />
          </th>
        </tr>
        </thead>

        <tbody>
        <tr v-if="props.loading">
          <td :colspan="visibleColumns.length + (props.selectable ? 1 : 0)" class="px-3 py-6 text-center text-gray-400">
            Loading…
          </td>
        </tr>

        <tr
            v-for="row in paged"
            v-else
            :key="props.rowKey(row)"
            class="border-t border-white/5 hover:bg-white/5 transition-colors"
        >
          <td v-if="props.selectable" class="px-3 py-2 align-middle">
            <input type="checkbox" :checked="selected.has(props.rowKey(row))" @change.stop="toggleRow(row)" aria-label="Select row" />
          </td>

          <td
              v-for="col in visibleColumns"
              :key="col.key"
              class="px-3 py-2 align-middle"
              :class="[
                col.class,
                col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
              ]"
              :style="columnWidths[col.key] ? { width: columnWidths[col.key] + 'px', minWidth: columnWidths[col.key] + 'px' } : undefined"
          >
            <slot :name="`cell:${col.key}`" :row="row" :value="getCell(row, col)">
              {{ getCell(row, col) }}
            </slot>
          </td>
        </tr>

        <tr v-if="!props.loading && paged.length === 0">
          <td :colspan="visibleColumns.length + (props.selectable ? 1 : 0)" class="px-3 py-10 text-center text-gray-400">
            <slot name="empty">No data found.</slot>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Footer -->
    <div class="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-400">
      <div>Page {{ internalPage }} of {{ pages }} • {{ totalRows }} rows</div>
      <div class="ms-auto flex items-center gap-2">
        <label>Rows per page</label>
        <select
            class="rounded-lg bg-white/5 border border-white/10 text-sm text-gray-100 px-2 py-1 outline-none"
            :value="internalPageSize"
            @change="internalPageSize = Number(($event.target as HTMLSelectElement).value); $emit('update:pageSize', internalPageSize); internalPage = 1; $emit('update:page', 1)"
        >
          <option v-for="n in props.pageSizes" :key="n" :value="n">{{ n }}</option>
        </select>

        <button class="rounded-md px-3 py-1 border border-white/10 bg-white/5 text-sm disabled:opacity-50" :disabled="internalPage <= 1" @click="internalPage = Math.max(1, internalPage - 1); $emit('update:page', internalPage)">Prev</button>
        <button class="rounded-md px-3 py-1 border border-white/10 bg-white/5 text-sm disabled:opacity-50" :disabled="internalPage >= pages" @click="internalPage = Math.min(pages, internalPage + 1); $emit('update:page', internalPage)">Next</button>
      </div>
    </div>
  </div>
</template>
