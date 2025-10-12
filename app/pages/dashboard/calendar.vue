<script setup lang="ts">
import { ref, computed } from 'vue'
import { CalendarDays, Plus } from 'lucide-vue-next'

const { t } = useI18n()

type EventItem = { id: string; date: string; title: string }
const today = new Date()
const year = today.getFullYear()
const month = today.getMonth() // 0-11

const selectedDate = ref<string>(new Date(year, month, today.getDate()).toISOString().slice(0,10))
const events = ref<EventItem[]>([
  { id: 'e1', date: new Date(year, month, 5).toISOString().slice(0,10), title: t('pages.calendar.events.deploy') },
  { id: 'e2', date: new Date(year, month, 12).toISOString().slice(0,10), title: t('pages.calendar.events.securityAudit') },
  { id: 'e3', date: new Date(year, month, today.getDate()).toISOString().slice(0,10), title: t('pages.calendar.events.teamStandup') },
])

const startDayOfWeek = new Date(year, month, 1).getDay() // 0-6
const daysInMonth = new Date(year, month + 1, 0).getDate()

const grid = computed(() => {
  const arr: Array<{ label: number | ''; iso: string | '' }> = []
  for (let i = 0; i < startDayOfWeek; i++) arr.push({ label: '', iso: '' })
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = new Date(year, month, d).toISOString().slice(0,10)
    arr.push({ label: d, iso })
  }
  return arr
})

const dayEvents = computed(() => events.value.filter(e => e.date === selectedDate.value))
const newTitle = ref('')

const addEvent = (): void => {
  if (!newTitle.value) return
  events.value.push({ id: crypto.randomUUID?.() ?? String(Date.now()), date: selectedDate.value, title: newTitle.value })
  newTitle.value = ''
}
</script>

<template>
  <section class="space-y-8">
    <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400">
      {{ t('pages.calendar.title') }}
    </h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Calendar -->
      <div class="lg:col-span-2 p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#8B5CF6_0%,#22D3EE_60%,#EC4899_100%)] animate-rotate-gradient">
        <div class="rounded-2xl bg-[rgba(15,17,23,0.92)] backdrop-blur-xl border border-white/10 p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-white font-semibold text-lg flex items-center gap-2">
              <CalendarDays class="w-5 h-5 text-cyan-400" />
              {{ new Date(year, month).toLocaleString(undefined, { month: 'long', year: 'numeric' }) }}
            </h2>
          </div>

          <div class="grid grid-cols-7 text-xs text-gray-400 mb-2">
            <div v-for="day in ['sun','mon','tue','wed','thu','fri','sat']" :key="day" class="text-center py-1">{{ t(`pages.calendar.days.${day}`) }}</div>
          </div>

          <div class="grid grid-cols-7 gap-1">
            <button
                v-for="(cell, idx) in grid"
                :key="idx"
                :disabled="!cell.iso"
                @click="selectedDate = cell.iso as string"
                class="aspect-square rounded-lg text-sm flex items-center justify-center transition-all"
                :class="[
                !cell.iso ? 'opacity-30 cursor-default' : 'hover:bg-white/10',
                cell.iso === selectedDate ? 'bg-gradient-to-r from-indigo-500/30 to-fuchsia-500/30 text-white ring-1 ring-white/20' : 'text-gray-300'
              ]"
            >
              {{ cell.label }}
            </button>
          </div>
        </div>
      </div>

      <!-- Day Details -->
      <div class="p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#22D3EE_0%,#8B5CF6_60%,#EC4899_100%)] animate-rotate-gradient">
        <div class="rounded-2xl bg-[rgba(15,17,23,0.92)] backdrop-blur-xl border border-white/10 p-6">
          <h3 class="text-white font-semibold mb-3">{{ t('pages.calendar.eventsTitle') }} — {{ selectedDate }}</h3>
          <ul class="space-y-2">
            <li v-for="e in dayEvents" :key="e.id" class="p-2 bg-white/5 rounded-lg text-sm text-white">{{ e.title }}</li>
            <li v-if="!dayEvents.length" class="text-sm text-gray-400">{{ t('pages.calendar.noEvents') }}</li>
          </ul>

          <div class="mt-4 flex gap-2">
            <input v-model="newTitle" class="input-dark w-full" :placeholder="t('pages.calendar.newEventPlaceholder')" />
            <button class="px-3 py-2 rounded-xl text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 hover:brightness-110 transition-all flex items-center gap-1" @click="addEvent">
              <Plus class="w-4 h-4" /> {{ t('pages.calendar.add') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@property --angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
@keyframes rotate-gradient { to { --angle: 360deg; } }
.animate-rotate-gradient { background-size: 200% 200%; animation: rotate-gradient 14s linear infinite; }
.input-dark { background-color: rgba(25,27,33,0.95); border: 1px solid rgba(255,255,255,0.08); color: var(--text-primary); border-radius: 0.75rem; padding: 0.75rem 1rem; transition: all .25s ease; }
.input-dark:focus { outline: none; border-color: rgba(236,72,153,0.4); box-shadow: 0 0 0 2px rgba(236,72,153,0.2); }
</style>
