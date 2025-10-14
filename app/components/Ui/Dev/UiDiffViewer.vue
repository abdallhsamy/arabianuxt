<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  before?: string
  after?: string
  showLineNumbers?: boolean
}>(), {
  before: '',
  after: '',
  showLineNumbers: true,
})

type DiffLine = { type: 'ctx' | 'add' | 'del'; text: string; a?: number; b?: number }

// naive LCS-free line matcher (fast & simple for UI diffs)
const diff = computed<DiffLine[]>(() => {
  const a = (props.before || '').split('\n')
  const b = (props.after || '').split('\n')
  const out: DiffLine[] = []
  let i = 0, j = 0, ai = 1, bi = 1
  while (i < a.length || j < b.length) {
    if (i < a.length && j < b.length && a[i] === b[j]) {
      out.push({ type: 'ctx', text: a[i] || '', a: ai++, b: bi++ })
      i++; j++
    } else if (j < b.length && (i >= a.length || !a.slice(i, i+3).includes(b[j] || ''))) {
      out.push({ type: 'add', text: b[j] || '', b: bi++ })
      j++
    } else if (i < a.length) {
      out.push({ type: 'del', text: a[i] || '', a: ai++ })
      i++
    }
  }
  return out
})
</script>

<template>
  <div class="rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl overflow-hidden">
    <div class="px-4 py-2 border-b border-white/10 text-sm text-gray-300">Diff</div>
    <div class="font-mono text-[12px] overflow-auto">
      <div
          v-for="(d, idx) in diff"
          :key="idx"
          class="px-3 py-1.5 whitespace-pre"
          :class="{
          'bg-emerald-500/10 text-emerald-100': d.type==='add',
          'bg-rose-500/10 text-rose-100': d.type==='del',
          'text-gray-200': d.type==='ctx'
        }"
      >
        <span v-if="showLineNumbers" class="inline-block w-12 text-right pr-2 opacity-60">
          {{ d.a ?? '' }}{{ (d.a!=null || d.b!=null) ? '|' : '' }}{{ d.b ?? '' }}
        </span>
        <span class="opacity-60">{{ d.type==='add' ? '+' : d.type==='del' ? '-' : ' ' }}</span>
        <span class="ms-2">{{ d.text }}</span>
      </div>
    </div>
  </div>
</template>
