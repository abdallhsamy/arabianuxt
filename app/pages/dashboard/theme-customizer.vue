<script setup lang="ts">
import { ref, watch } from 'vue'

type Theme = { primary:string; accent:string; surface:string; text:string }
const theme = ref<Theme>({
  primary: '#8B5CF6',
  accent:  '#22D3EE',
  surface: '#0F1117',
  text:    '#E5E7EB',
})

watch(theme, () => {
  // Apply CSS vars for live preview (optional)
  const r = document.documentElement
  r.style.setProperty('--theme-primary', theme.value.primary)
  r.style.setProperty('--theme-accent', theme.value.accent)
  r.style.setProperty('--theme-surface', theme.value.surface)
  r.style.setProperty('--theme-text', theme.value.text)
}, { deep: true })

const download = (): void => {
  const blob = new Blob([JSON.stringify(theme.value, null, 2)], { type:'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'theme.json'; a.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <section class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400">Theme Customizer</h1>
      <button class="px-4 py-2 rounded-xl text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 hover:brightness-110" @click="download">Export JSON</button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Controls -->
      <div class="p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#8B5CF6_0%,#22D3EE_55%,#EC4899_100%)] animate-rotate-gradient">
        <div class="rounded-2xl bg-[rgba(15,17,23,0.94)] border border-white/10 p-5 space-y-4">
          <div class="flex items-center gap-3">
            <input v-model="theme.primary" type="color" class="h-10 w-14 rounded-lg border border-white/10 bg-transparent" />
            <div class="text-sm">
              <p class="text-white font-medium">Primary</p>
              <p class="text-gray-400 text-xs">{{ theme.primary }}</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <input v-model="theme.accent" type="color" class="h-10 w-14 rounded-lg border border-white/10 bg-transparent" />
            <div class="text-sm">
              <p class="text-white font-medium">Accent</p>
              <p class="text-gray-400 text-xs">{{ theme.accent }}</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <input v-model="theme.surface" type="color" class="h-10 w-14 rounded-lg border border-white/10 bg-transparent" />
            <div class="text-sm">
              <p class="text-white font-medium">Surface</p>
              <p class="text-gray-400 text-xs">{{ theme.surface }}</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <input v-model="theme.text" type="color" class="h-10 w-14 rounded-lg border border-white/10 bg-transparent" />
            <div class="text-sm">
              <p class="text-white font-medium">Text</p>
              <p class="text-gray-400 text-xs">{{ theme.text }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Preview -->
      <div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="rounded-2xl p-5 border" :style="{ backgroundColor: 'var(--theme-surface)', color:'var(--theme-text)', borderColor:'rgba(255,255,255,0.1)' }">
          <h3 class="font-semibold mb-2">Buttons</h3>
          <div class="flex gap-3">
            <button class="px-4 py-2 rounded-xl text-white" :style="{ backgroundImage:`linear-gradient(90deg, ${theme.primary}, ${theme.accent})` }">Primary</button>
            <button class="px-4 py-2 rounded-xl bg-white/10 text-white border border-white/10">Ghost</button>
          </div>
        </div>
        <div class="rounded-2xl p-5 border" :style="{ backgroundColor: 'var(--theme-surface)', color:'var(--theme-text)', borderColor:'rgba(255,255,255,0.1)' }">
          <h3 class="font-semibold mb-2">Cards</h3>
          <div class="rounded-xl p-4 border" :style="{ borderColor:'rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.05)' }">
            <p class="text-sm">Glass card with gradient header</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
