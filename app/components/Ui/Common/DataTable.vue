<script setup lang="ts">
const props = defineProps<{
  headers: Array<{ key: string; label: string; class?: string }>
  rows: Array<Record<string, unknown>>
  rowKey?: string
}>()

const getKey = (row: Record<string, unknown>, index: number): string => {
  const k = (props.rowKey ? String(row[props.rowKey]) : undefined)
  return k ?? String(index)
}
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full text-sm">
      <thead class="text-gray-400">
      <tr class="text-left">
        <th v-for="h in headers" :key="h.key" class="py-2 font-medium" :class="h.class ?? ''">
          {{ h.label }}
        </th>
      </tr>
      </thead>
      <tbody class="divide-y divide-white/10">
      <tr
          v-for="(row, i) in rows"
          :key="getKey(row, i)"
          class="hover:bg-white/5 transition-colors"
      >
        <td
            v-for="h in headers"
            :key="h.key"
            class="py-3 text-gray-200"
            :class="h.class ?? ''"
        >
          <slot :name="`cell:${h.key}`" :row="row">
            {{ row[h.key] as any }}
          </slot>
        </td>
      </tr>
      <tr v-if="!rows.length">
        <td :colspan="headers.length" class="py-6 text-center text-gray-400">No data</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
