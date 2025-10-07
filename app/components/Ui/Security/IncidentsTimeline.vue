<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { ShieldAlert, AlertTriangle, CheckCircle2, Globe, LogIn, LogOut } from 'lucide-vue-next'

type Severity = 'critical' | 'warning' | 'info'

interface Incident {
  id: string
  time: string
  message: string
  ip: string
  location: string
  severity: Severity
  icon: any
}

const props = withDefaults(defineProps<{
  isLive?: boolean
}>(), { isLive: true })

const incidents = ref<Incident[]>([])
let interval: NodeJS.Timeout | null = null

const now = (): string => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

const generateIncident = (): Incident => {
  const severities: Severity[] = ['critical', 'warning', 'info']
  const severity = pick(severities)
  const pools = {
    critical: [
      { message: 'Multiple failed login attempts detected', icon: ShieldAlert },
      { message: 'Suspicious access blocked by firewall', icon: ShieldAlert },
    ],
    warning: [
      { message: 'Unusual device login', icon: AlertTriangle },
      { message: 'Password changed', icon: AlertTriangle },
    ],
    info: [
      { message: 'Successful login', icon: LogIn },
      { message: 'User logged out', icon: LogOut },
      { message: 'Location verified', icon: Globe },
    ],
  } as const

  const item = pick(pools[severity])
  const locs = ['Riyadh, SA', 'Cairo, EG', 'Dubai, AE', 'Berlin, DE', 'NYC, US']
  const ips = ['10.12.45.201', '172.16.8.44', '192.168.1.87', '10.0.2.33', '172.20.14.6']

  return {
    id: crypto.randomUUID?.() ?? String(Date.now() + Math.random()),
    time: now(),
    message: item.message,
    ip: pick(ips),
    location: pick(locs),
    severity,
    icon: item.icon,
  }
}

const start = (): void => {
  if (interval) clearInterval(interval)
  interval = setInterval(() => {
    if (!props.isLive) return
    incidents.value.unshift(generateIncident())
    if (incidents.value.length > 20) incidents.value.pop()
  }, 3000)
}

onMounted(() => {
  // seed a few rows instantly
  incidents.value = Array.from({ length: 6 }, () => generateIncident())
  start()
})

onUnmounted(() => { if (interval) clearInterval(interval) })

watch(() => props.isLive, (live) => {
  if (live) start()
  else if (interval) { clearInterval(interval); interval = null }
})

const chipClasses = (sev: Severity): string => ({
  critical: 'bg-rose-500/15 text-rose-400 border border-rose-400/30',
  warning: 'bg-amber-400/15 text-amber-300 border border-amber-300/30',
  info:    'bg-cyan-400/15 text-cyan-300 border border-cyan-300/30',
}[sev])
</script>

<template>
  <div class="p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#8B5CF6_0%,#EC4899_50%,#22D3EE_100%)] animate-rotate-gradient">
    <div class="rounded-2xl bg-[rgba(15,17,23,0.92)] backdrop-blur-xl border border-white/10 p-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-white font-semibold text-lg">Security Incidents Timeline</h2>
        <span
            :class="[
            'text-xs px-2 py-0.5 rounded-full',
            isLive ? 'bg-green-500/15 text-green-400 border border-green-400/30' : 'bg-gray-600/20 text-gray-300 border border-gray-400/20'
          ]"
        >
          {{ isLive ? 'Live' : 'Paused' }}
        </span>
      </div>

      <transition-group
          name="fade-list"
          tag="ul"
          class="divide-y divide-white/10"
      >
        <li
            v-for="row in incidents"
            :key="row.id"
            class="grid grid-cols-1 sm:grid-cols-12 items-center gap-3 py-3"
        >
          <div class="sm:col-span-1 flex items-center justify-center">
            <component :is="row.icon" class="w-5 h-5"
                       :class="row.severity === 'critical' ? 'text-rose-400' : row.severity === 'warning' ? 'text-amber-300' : 'text-cyan-300'" />
          </div>

          <div class="sm:col-span-6">
            <p class="text-white text-sm">{{ row.message }}</p>
            <p class="text-xs text-gray-400 mt-0.5">IP {{ row.ip }} • {{ row.location }}</p>
          </div>

          <div class="sm:col-span-3">
            <span class="text-xs px-2 py-1 rounded-full inline-flex items-center gap-1" :class="chipClasses(row.severity)">
              <span class="w-1.5 h-1.5 rounded-full" :class="row.severity === 'critical' ? 'bg-rose-400' : row.severity === 'warning' ? 'bg-amber-300' : 'bg-cyan-300'"></span>
              {{ row.severity }}
            </span>
          </div>

          <div class="sm:col-span-2 text-right text-xs text-gray-400">{{ row.time }}</div>
        </li>
      </transition-group>
    </div>
  </div>
</template>

<style scoped>
@property --angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
@keyframes rotate-gradient { to { --angle: 360deg; } }
.animate-rotate-gradient { background-size: 200% 200%; animation: rotate-gradient 14s linear infinite; }

/* smooth list entrance */
.fade-list-enter-from { opacity: 0; transform: translateY(-6px); filter: blur(4px); }
.fade-list-enter-active { transition: all 280ms ease; }
.fade-list-leave-to { opacity: 0; transform: translateY(6px); filter: blur(4px); }
.fade-list-leave-active { transition: all 220ms ease; }
</style>
